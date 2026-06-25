import { Request, Response } from "express";
import { WebSocket } from 'ws';
import type { ClientResponse, InterviewContext, StartInterview } from "./interview.types";
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

export const startInterview = async (req: Request, res: Response) => {
    const interviewId = req.params.interviewId as string
    const userId = req.userId as string
    const sessionId = await interviewService.startInterview(interviewId, userId)
    res.status(200).json({
        success: true,
        message: 'Starting the session',
        data: sessionId
    })
}

export const fetchInterview = async (req: Request, res: Response) => {
    const interviewId = req.body.interviewId
    const interview = await interviewService.fetchInterview(interviewId)
    res.json(interview)
}

export const handleMessage = async (sessionId: string, message: ClientResponse, userId: string) => {
    switch (message.type) {
        case 'start_interview':
            return interviewService.setupGemini(sessionId, userId)
        case 'candidate_audio':
            return interviewService.processCandidateMessage(sessionId, message)
        case 'end-interview':
            return interviewService.endInterview(sessionId)
    }
}





