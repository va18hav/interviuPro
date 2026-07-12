import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { OAuth2Client } from 'google-auth-library'
import * as authRepository from './auth.repository'
import { RegisterUserInput, LoginUserInput } from './auth.types'
import { AppError } from '../../utils/appError'
import { findUserById } from '../../utils/dbservices'
import { deleteOTP, getOTP, storeOTP } from './auth.redis'
import { sendEmail } from '../../utils/emailService'

export const register = async (data: RegisterUserInput) => {
    const existingUser = await authRepository.findUserByEmail(data.email)
    if (existingUser) {
        throw new AppError(400, 'Email is already taken')
    }
    const hashedPassword = await bcrypt.hash(data.password, 10)

    const user = await authRepository.createUser({
        email: data.email,
        hashedPassword
    })

    const token = jwt.sign(
        { userId: user.id, isEmailVerified: user.isEmailVerified },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
    )

    return {
        user: { id: user.id, email: user.email, isEmailVerified: user.isEmailVerified },
        token
    }
}

export const generateOTP = async (userId: string) => {
    const user = await findUserById(userId)
    if (!user) throw new AppError(400, 'User does not exist')
    if (user.isEmailVerified) throw new AppError(400, 'Email already verified')
    const existingOTP = await getOTP(userId)
    if (existingOTP) await deleteOTP(userId)
    const otp = crypto.randomInt(0, 10000).toString().padStart(4, "0")
    const hashedOTP = await bcrypt.hash(otp, 10)
    await storeOTP(hashedOTP, user.id)
    await sendEmail(user.email, otp)
    return 'OTP sent successfully'
}

export const verifyEmail = async (otp: string, userId: string) => {
    const user = await findUserById(userId)
    if (!user) throw new AppError(400, 'User does not exist')
    const hashedOTP = await getOTP(userId)
    if (!hashedOTP) throw new AppError(400, 'The otp has been expired, generate a new one')
    const isValid = await bcrypt.compare(otp, hashedOTP)
    if (!isValid) throw new AppError(400, 'Invalid OTP')
    const updatedUser = await authRepository.verifyEmail(userId)
    await deleteOTP(userId)

    const token = jwt.sign(
        { userId: updatedUser.id, isEmailVerified: updatedUser.isEmailVerified },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
    )

    return {
        user: updatedUser,
        token
    }
}

export const login = async (data: LoginUserInput) => {
    const user = await authRepository.findUserByEmail(data.email)
    if (!user) {
        throw new AppError(401, 'Invalid email or password')
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.hashedPassword)
    if (!isPasswordValid) {
        throw new AppError(401, 'Invalid email or password')
    }
    const token = jwt.sign(
        { userId: user.id, isEmailVerified: user.isEmailVerified },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
    )
    return {
        user: { id: user.id, email: user.email, isEmailVerified: user.isEmailVerified },
        token
    }
}

export const resetPassword = async (userId: string, password: string) => {
    const user = await findUserById(userId)
    if (!user) {
        throw new AppError(401, 'User not found')
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    return await authRepository.resetPassword(userId, hashedPassword)
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export const googleAuth = async (idToken: string) => {
    const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID
    })
    const payload = ticket.getPayload()
    if (!payload || !payload.email) {
        throw new AppError(400, 'Invalid Google token')
    }

    const { email } = payload

    let user = await authRepository.findUserByEmail(email)

    if (!user) {
        // Register a new user with isEmailVerified: true
        // Set their hashedPassword to a secure, random placeholder hash (impossible to guess)
        const randomPassword = `GOOGLE_OAUTH_ACCOUNT_${crypto.randomUUID()}`
        const hashedPassword = await bcrypt.hash(randomPassword, 10)
        user = await authRepository.createGoogleUser({
            email,
            hashedPassword
        })
    }

    const token = jwt.sign(
        { userId: user.id, isEmailVerified: user.isEmailVerified },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
    )

    return {
        user: {
            id: user.id,
            email: user.email,
            isEmailVerified: user.isEmailVerified,
            onboarding_step1: user.onboarding_step1,
            onboarding_step2: user.onboarding_step2
        },
        token
    }
}


