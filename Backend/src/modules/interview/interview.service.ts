import type { CreateInterviewContext } from "./interview.types"
import * as interviewRepository from './interview.repository'
import crypto, { randomUUID } from 'crypto'
import { findUserById, findUserProfile } from "../../utils/dbservices"
import { AppError } from "../../utils/appError"
import WebSocket from "ws"
import { setupGeminiConnection } from "../../aiUtils/geminiAI/gemini.service"
import { feedbackPrompt } from "../../aiUtils/anthropicAI/prompt"
import { callAI } from "../../aiUtils/anthropicAI/anthropic.service"


//utility function

export const createInterview = async (context: CreateInterviewContext, userId: string) => {
    const user = await findUserById(userId)
    if (!user) {
        throw new AppError(404, 'User Not Found')
    }
    const interviewId = await interviewRepository.createInterview(context, userId)
    return interviewId
}

export const fetchInterview = async (interviewId: string) => {
    return await interviewRepository.fetchInterview(interviewId)
}

export const fetchAllInterviews = async (userId: string) => {
    const result = await interviewRepository.fetchAllInterviews(userId)
    if (!result) throw new AppError(400, 'No interviews found')
    return result
}

export const fetchInterviewSessions = async (interviewId: string, userId: string) => {
    const result = await interviewRepository.fetchInterviewSessions(interviewId)
    if (!result?.sessions) throw new AppError(400, 'No sessions found')
    if (result.userId !== userId) throw new AppError(400, 'The interview does not belong to the user')
    return result
}