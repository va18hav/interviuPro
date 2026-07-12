import { Request, Response } from "express"
import { registerUserSchema, loginUserSchema, resetPasswordSchema } from "./auth.types"
import * as authService from './auth.service'

export const registerUser = async (req: Request, res: Response) => {
    const data = registerUserSchema.parse(req.body)
    const result = await authService.register(data)
    res
        .cookie('token', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? true : false,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
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
        .cookie('token', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? true : false,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
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
        .cookie('token', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? true : false,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
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
            secure: process.env.NODE_ENV === 'production' ? true : false,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
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

export const googleLogin = async (req: Request, res: Response) => {
    const { token } = req.body
    if (!token) {
        return res.status(400).json({ success: false, message: 'Google token is required' })
    }
    const result = await authService.googleAuth(token)
    res
        .cookie('token', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? true : false,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        .status(200)
        .json({
            success: true,
            message: 'User logged in successfully with Google',
            data: result.user
        })
}