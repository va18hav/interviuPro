import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
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


