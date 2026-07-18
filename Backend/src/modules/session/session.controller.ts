import { Request, Response } from "express"
import * as sessionService from './session.service'
import { ClientResponse } from "./session.types"
import { AppError } from "../../utils/appError"

export const startInterview = async (req: Request, res: Response) => {
    const interviewId = req.params.interviewId as string
    const userId = req.userId as string
    const { type, duration } = req.body
    if (!type) throw new AppError(400, 'Please enter the round type')
    const sessionId = await sessionService.startInterview(interviewId, userId, type, duration)
    res.status(200).json({
        success: true,
        message: 'Starting the session',
        data: sessionId
    })
}

export const handleMessage = async (sessionId: string, message: ClientResponse, userId: string) => {
    switch (message.type) {
        case 'start_interview':
            return sessionService.setupGemini(sessionId, userId)
        case 'candidate_audio':
            return sessionService.processCandidateMessage(sessionId, message)
        case 'candidate_code':
            return sessionService.processCandidateMessage(sessionId, message)
        case 'end_interview':
            return sessionService.endInterview(sessionId)
    }
}


export const getSessionMeta = async (req: Request, res: Response) => {
    const sessionId = req.params.sessionId as string
    const data = await sessionService.getSessionMeta(sessionId)
    res.status(200).json({
        success: true,
        message: 'Session meta fetched successfully',
        data
    })
}


export const getAllSessions = async (req: Request, res: Response) => {
    const userId = req.userId as string
    const data = await sessionService.getAllSessions(userId)
    res.status(200).json({
        success: true,
        message: 'All sessions fetched successfully',
        data: data
    })
}

export const getSession = async (req: Request, res: Response) => {
    const userId = req.userId as string
    const sessionId = req.params.sessionId as string
    const data = await sessionService.getSession(sessionId, userId)
    res.status(200).json({
        success: true,
        message: 'Session fetched successfully',
        data: data
    })
}

export const getTranscript = async (req: Request, res: Response) => {
    const userId = req.userId as string
    const sessionId = req.params.sessionId as string
    const data = await sessionService.getTranscript(sessionId, userId)
    res.status(200).json({
        success: true,
        message: 'Transcript fetched successfully',
        data: data
    })
}