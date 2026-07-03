import { Request, Response } from "express";
import { WebSocket } from 'ws';
import * as interviewService from './interview.service'

export const createInterview = async (req: Request, res: Response) => {
    const context = req.body
    const userId = req.userId as string
    const interviewId = await interviewService.createInterview(context, userId)
    res.status(201).json({
        success: true,
        message: 'Interview has been created successfully',
        data: { interviewId }
    })
}

export const fetchInterview = async (req: Request, res: Response) => {
    const interviewId = req.params.interviewId as string
    const interview = await interviewService.fetchInterview(interviewId)
    res.status(200).json({
        success: true,
        message: 'Interview fetched Successfully',
        data: {
            title: interview?.title
        }
    })
}

export const fetchAllInterviews = async (req: Request, res: Response) => {
    const userId = req.userId as string
    const data = await interviewService.fetchAllInterviews(userId)
    res.status(200).json({
        success: true,
        message: 'Interviews fetched successfully',
        data: data
    })
}

export const fetchInterviewSessions = async (req: Request, res: Response) => {
    const userId = req.userId as string
    const interviewId = req.params.interviewId as string
    const data = await interviewService.fetchInterviewSessions(interviewId, userId)
    res.status(200).json({
        success: true,
        message: 'All the sessions fetched successfully',
        data: data
    })
}





