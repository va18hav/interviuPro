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

// ─── OAuth helpers ────────────────────────────────────────────────────────────

function signUserToken(user: { id: string; isEmailVerified: boolean }) {
    return jwt.sign(
        { userId: user.id, isEmailVerified: user.isEmailVerified },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
    )
}

// ─── Google ───────────────────────────────────────────────────────────────────

export const googleOAuthRedirect = () => {
    const params = new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        redirect_uri: `${process.env.BACKEND_URL || 'http://localhost:3000'}/auth/google/callback`,
        response_type: 'code',
        scope: 'email profile',
        access_type: 'offline',
        prompt: 'select_account',
    })
    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
}

export const googleOAuthCallback = async (code: string) => {
    // Exchange code for tokens
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            code,
            client_id: process.env.GOOGLE_CLIENT_ID!,
            client_secret: process.env.GOOGLE_CLIENT_SECRET!,
            redirect_uri: `${process.env.BACKEND_URL || 'http://localhost:3000'}/auth/google/callback`,
            grant_type: 'authorization_code',
        }).toString(),
    })

    const tokenData = await tokenRes.json() as { access_token?: string; error?: string }
    if (!tokenData.access_token) {
        throw new AppError(400, `Google OAuth token exchange failed: ${tokenData.error || 'unknown error'}`)
    }

    // Fetch user info
    const userRes = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
    })
    const userInfo = await userRes.json() as { email?: string; verified_email?: boolean }

    if (!userInfo.email || !userInfo.verified_email) {
        throw new AppError(400, 'Could not retrieve a verified email from Google')
    }

    const user = await authRepository.upsertOAuthUser(userInfo.email, 'GOOGLE')
    const token = signUserToken(user)

    return {
        user: {
            id: user.id,
            email: user.email,
            isEmailVerified: user.isEmailVerified,
            onboarding_step1: user.onboarding_step1,
            onboarding_step2: user.onboarding_step2,
        },
        token,
    }
}

// ─── GitHub ───────────────────────────────────────────────────────────────────

export const githubOAuthRedirect = () => {
    const params = new URLSearchParams({
        client_id: process.env.GITHUB_CLIENT_ID!,
        redirect_uri: `${process.env.BACKEND_URL || 'http://localhost:3000'}/auth/github/callback`,
        scope: 'user:email',
    })
    return `https://github.com/login/oauth/authorize?${params.toString()}`
}

export const githubOAuthCallback = async (code: string) => {
    // Exchange code for access token
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            client_id: process.env.GITHUB_CLIENT_ID!,
            client_secret: process.env.GITHUB_CLIENT_SECRET!,
            code,
            redirect_uri: `${process.env.BACKEND_URL || 'http://localhost:3000'}/auth/github/callback`,
        }),
    })

    const tokenData = await tokenRes.json() as { access_token?: string; error?: string; error_description?: string }
    if (!tokenData.access_token) {
        throw new AppError(400, `GitHub OAuth token exchange failed: ${tokenData.error_description || tokenData.error || 'unknown error'}`)
    }

    // Fetch the primary verified email from GitHub's emails API
    const emailsRes = await fetch('https://api.github.com/user/emails', {
        headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
            'User-Agent': 'InterviuPro',
            'Accept': 'application/vnd.github+json',
        },
    })

    const emails = await emailsRes.json() as Array<{ email: string; primary: boolean; verified: boolean }>

    const primaryEmail = emails.find((e) => e.primary && e.verified)
    if (!primaryEmail) {
        throw new AppError(400, 'No verified email found on your GitHub account. Please make your primary email public in GitHub settings and try again.')
    }

    const user = await authRepository.upsertOAuthUser(primaryEmail.email, 'GITHUB')
    const token = signUserToken(user)

    return {
        user: {
            id: user.id,
            email: user.email,
            isEmailVerified: user.isEmailVerified,
            onboarding_step1: user.onboarding_step1,
            onboarding_step2: user.onboarding_step2,
        },
        token,
    }
}
