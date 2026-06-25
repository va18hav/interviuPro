import { Request, Response } from "express"
import { registerUserSchema, loginUserSchema } from "./auth.types"
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
    res.clearCookie('token').json({
        message: 'Logged Out'
    })
}