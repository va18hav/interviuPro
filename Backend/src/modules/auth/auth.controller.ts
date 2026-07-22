import { Request, Response } from "express"
import { registerUserSchema, loginUserSchema, resetPasswordSchema } from "./auth.types"
import * as authService from './auth.service'

const cookieOptions = (req: Request) => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: (process.env.NODE_ENV === 'production' ? 'none' : 'lax') as 'none' | 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
})

/**
 * Dynamically resolves the Backend's Base URL (protocol + host)
 */
function getBackendBaseUrl(req: Request): string {
    if (process.env.BACKEND_URL) return process.env.BACKEND_URL.replace(/\/$/, '')
    const proto = req.headers['x-forwarded-proto'] || req.protocol || 'http'
    const host = req.get('host') || 'localhost:3000'
    return `${proto}://${host}`
}

/**
 * Dynamically resolves the Frontend's Base URL
 */
function getFrontendBaseUrl(req: Request): string {
    // 1. Try to decode state param if passed during OAuth redirect
    if (req.query.state && typeof req.query.state === 'string') {
        try {
            const decoded = JSON.parse(Buffer.from(req.query.state, 'base64url').toString('utf8'))
            if (decoded.frontendOrigin) return decoded.frontendOrigin.replace(/\/$/, '')
        } catch {
            // ignore JSON parse error
        }
    }
    // 2. Try explicit FRONTEND_URL env var
    if (process.env.FRONTEND_URL) return process.env.FRONTEND_URL.replace(/\/$/, '')
    // 3. Fallback to Referer / Origin header or local dev
    const origin = req.get('origin') || req.get('referer')
    if (origin) {
        try {
            const url = new URL(origin)
            return url.origin
        } catch {
            // ignore URL parse error
        }
    }
    return 'http://localhost:5173'
}

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
    const backendBaseUrl = getBackendBaseUrl(req)
    const frontendOrigin = req.query.redirect_origin as string || getFrontendBaseUrl(req)
    const url = authService.googleOAuthRedirect(backendBaseUrl, frontendOrigin)
    res.redirect(url)
}

export const googleCallback = async (req: Request, res: Response) => {
    const frontendBaseUrl = getFrontendBaseUrl(req)
    const backendBaseUrl = getBackendBaseUrl(req)
    try {
        const { code, error } = req.query as { code?: string; error?: string }
        if (error || !code) {
            const msg = error || 'Google sign-in was cancelled'
            return res.redirect(`${frontendBaseUrl}/oauth-error?message=${encodeURIComponent(msg)}`)
        }
        const result = await authService.googleOAuthCallback(code, backendBaseUrl)
        res
            .cookie('token', result.token, cookieOptions(req))
            .redirect(`${frontendBaseUrl}/oauth-success`)
    } catch (err: any) {
        const msg = err?.message || 'Google sign-in failed'
        res.redirect(`${frontendBaseUrl}/oauth-error?message=${encodeURIComponent(msg)}`)
    }
}

// ─── GitHub OAuth ─────────────────────────────────────────────────────────────

export const githubRedirect = (req: Request, res: Response) => {
    const backendBaseUrl = getBackendBaseUrl(req)
    const frontendOrigin = req.query.redirect_origin as string || getFrontendBaseUrl(req)
    const url = authService.githubOAuthRedirect(backendBaseUrl, frontendOrigin)
    res.redirect(url)
}

export const githubCallback = async (req: Request, res: Response) => {
    const frontendBaseUrl = getFrontendBaseUrl(req)
    const backendBaseUrl = getBackendBaseUrl(req)
    try {
        const { code, error } = req.query as { code?: string; error?: string }
        if (error || !code) {
            const msg = error || 'GitHub sign-in was cancelled'
            return res.redirect(`${frontendBaseUrl}/oauth-error?message=${encodeURIComponent(msg)}`)
        }
        const result = await authService.githubOAuthCallback(code, backendBaseUrl)
        res
            .cookie('token', result.token, cookieOptions(req))
            .redirect(`${frontendBaseUrl}/oauth-success`)
    } catch (err: any) {
        const msg = err?.message || 'GitHub sign-in failed'
        res.redirect(`${frontendBaseUrl}/oauth-error?message=${encodeURIComponent(msg)}`)
    }
}