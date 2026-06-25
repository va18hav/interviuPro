import { Request, Response } from "express"
import { createProfileSchema } from "./profile.types"
import * as profileService from './profile.service'
import { AppError } from "../../utils/appError"

export const createProfile = async(req: Request, res: Response) => {
    const input = req.body
    const userId = req.userId as string
    const data = createProfileSchema.parse({userId, ...input})
    const result = await profileService.create(data)
    res
    .status(201)
    .json({
        success: true,
        message: 'The user profile has been created successfully',
        data: result
    })
}

export const uploadResume = async(req: Request, res: Response) => {
    const file = req.file
    if(!file){
        throw new AppError (400, 'No Resume File provided')
    }
    const userId = req.userId as string
    const fileBuffer = file.buffer
    const mimetype = file.mimetype

    const result = await profileService.uploadResume(fileBuffer, mimetype, userId)
    res.status(201).json({
        success: true,
        message: 'Resume uploaded successfuly',
        data: result
    })

}

export const getUser = async(req: Request, res: Response) => {
    const userId = req.userId as string
    const user = await profileService.getUser(userId)
    res.status(200).json({
        sucess: true,
        message: 'User fetched successfully',
        user
    })
}

export const getUserProfile = async(req: Request, res: Response) => {
    const userId = req.userId as string
    const profile = await profileService.getUserProfile(userId)
    res.status(200).json({
        sucess: true,
        message: 'Profile fetched successfully',
        profile
    })
}