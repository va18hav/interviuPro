import { Request, Response } from "express"
import { createProfileSchema, updateProfileSchema } from "./profile.types"
import * as profileService from './profile.service'
import { AppError } from "../../utils/appError"

export const createProfile = async (req: Request, res: Response) => {
    const input = req.body
    const userId = req.userId as string
    const data = createProfileSchema.parse({ userId, ...input })
    const result = await profileService.create(data)
    res
        .status(201)
        .json({
            success: true,
            message: 'The user profile has been created successfully',
            data: result
        })
}

export const updateProfile = async (req: Request, res: Response) => {
    const userId = req.userId as string
    const data = updateProfileSchema.parse(req.body)
    const result = await profileService.update(userId, data)
    res.status(201).json({
        success: true,
        message: 'The details have been updated successfully',
        data: result
    })
}

export const getUser = async (req: Request, res: Response) => {
    const userId = req.userId as string
    const user = await profileService.getUser(userId)
    res.status(200).json({
        sucess: true,
        message: 'User fetched successfully',
        data: user
    })
}

export const getUserProfile = async (req: Request, res: Response) => {
    const userId = req.userId as string
    const profile = await profileService.getUserProfile(userId)
    res.status(200).json({
        success: true,
        message: 'Profile fetched successfully',
        data: profile
    })
}