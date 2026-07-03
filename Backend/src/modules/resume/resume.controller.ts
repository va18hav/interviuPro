import { Request, Response } from "express";
import { AppError } from "../../utils/appError";
import * as resumeService from './resume.service'

export const uploadResume = async (req: Request, res: Response) => {
    const file = req.file
    if (!file) {
        throw new AppError(400, 'No Resume File provided')
    }
    const userId = req.userId as string
    const fileBuffer = file.buffer
    const mimetype = file.mimetype

    const result = await resumeService.uploadResume(fileBuffer, mimetype, userId)
    res.status(201).json({
        success: true,
        message: 'Resume uploaded successfuly',
        data: result
    })

}

export const updateResume = async (req: Request, res: Response) => {
    const file = req.file
    if (!file) {
        throw new AppError(400, 'No file provided')
    }
    const userId = req.userId as string
    const fileBuffer = file.buffer
    const mimeType = file.mimetype
    const result = await resumeService.updateResume(fileBuffer, mimeType, userId)
    res.status(200).json({
        success: true,
        message: 'Resume uploaded successfully',
        data: result
    })
}