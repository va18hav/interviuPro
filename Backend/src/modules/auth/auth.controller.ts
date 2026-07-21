import { Request, Response } from "express"
import { registerUserSchema, loginUserSchema, resetPasswordSchema } from "./auth.types"
import * as authService from './auth.service'

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

const cookieOptions = (req: Request) => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: (process.env.NODE_ENV === 'production' ? 'none' : 'lax') as 'none' | 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
})

export const registerUser = async (req: Request, res: Response) => {
    const data = registerUserSchema.parse(req.body)
    const result = await authService.register(data)
    res
        .cookie('token', result.token, cookieOptions(req))
        .status(201)
        .json({
            success: true,
            message: 'User registered successfully',
            data: result.user
        })
}

export const verifyEmail = async (req: Request, res: Response) => {
    const { otp } = req.body
    const userId = req.userId as string
    const result = await authService.verifyEmail(otp, userId)
    res
        .cookie('token', result.token, cookieOptions(req))
        .status(200)
        .json({
            success: true,
            message: 'Email verified successfully',
            data: result.user
        })
}

export const sendOTP = async (req: Request, res: Response) => {
    const userId = req.userId as string
    const message = await authService.generateOTP(userId)
    res.status(200).json({
        success: true,
        message
    })
}

export const loginUser = async (req: Request, res: Response) => {
    const data = loginUserSchema.parse(req.body)
    const result = await authService.login(data)
    res
        .cookie('token', result.token, cookieOptions(req))
        .status(200)
        .json({
            success: true,
            message: 'User logged in successfully',
            data: result.user
        })
}

export const logutUser = (req: Request, res: Response) => {
    res
        .clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: (process.env.NODE_ENV === 'production' ? 'none' : 'lax') as 'none' | 'lax',
        })
        .status(200)
        .json({
            success: true,
            message: 'User logged out successfully'
        })
}

export const resetPassword = async (req: Request, res: Response) => {
    const { password } = resetPasswordSchema.parse(req.body)
    const userId = req.userId as string
    const result = await authService.resetPassword(userId, password)
    res.status(201).json({
        success: true,
        message: 'Password updated successfully',
        data: result
    })
}

// ─── Google OAuth ─────────────────────────────────────────────────────────────

export const googleRedirect = (req: Request, res: Response) => {
    const url = authService.googleOAuthRedirect()
    res.redirect(url)
}

export const googleCallback = async (req: Request, res: Response) => {
    try {
        const { code, error } = req.query as { code?: string; error?: string }
        if (error || !code) {
            const msg = error || 'Google sign-in was cancelled'
            return res.redirect(`${FRONTEND_URL}/oauth-error?message=${encodeURIComponent(msg)}`)
        }
        const result = await authService.googleOAuthCallback(code)
        res
            .cookie('token', result.token, cookieOptions(req))
            .redirect(`${FRONTEND_URL}/oauth-success`)
    } catch (err: any) {
        const msg = err?.message || 'Google sign-in failed'
        res.redirect(`${FRONTEND_URL}/oauth-error?message=${encodeURIComponent(msg)}`)
    }
}

// ─── GitHub OAuth ─────────────────────────────────────────────────────────────

export const githubRedirect = (req: Request, res: Response) => {
    const url = authService.githubOAuthRedirect()
    res.redirect(url)
}

export const githubCallback = async (req: Request, res: Response) => {
    try {
        const { code, error } = req.query as { code?: string; error?: string }
        if (error || !code) {
            const msg = error || 'GitHub sign-in was cancelled'
            return res.redirect(`${FRONTEND_URL}/oauth-error?message=${encodeURIComponent(msg)}`)
        }
        const result = await authService.githubOAuthCallback(code)
        res
            .cookie('token', result.token, cookieOptions(req))
            .redirect(`${FRONTEND_URL}/oauth-success`)
    } catch (err: any) {
        const msg = err?.message || 'GitHub sign-in failed'
        res.redirect(`${FRONTEND_URL}/oauth-error?message=${encodeURIComponent(msg)}`)
    }
}