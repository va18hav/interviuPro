import { Request, Response } from "express";
import * as feedbackService from './feedback.service'

export const generateFeedback = async (req: Request, res: Response) => {
    const interviewId = req.body.interviewId
    const sessionId = req.params.sessionId as string
    const data = await feedbackService.generateFeedback(interviewId, sessionId)
    res.status(200).json({
        success: true,
        message: 'The feedback has been created successfully',
        data: data
    })
}