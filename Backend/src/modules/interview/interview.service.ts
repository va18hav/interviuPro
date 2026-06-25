import type { ClientResponse, InterviewContext } from "./interview.types"
import { systemPrompt } from "./geminiAI/prompts"
import * as interviewRepository from './interview.repository'
import crypto, { randomUUID } from 'crypto'
import { findUserById, findUserProfile } from "../../utils/dbservices"
import { AppError } from "../../utils/appError"
import WebSocket from "ws"
import { sessions, cleanupSession } from "./interview.session"
import { setupGeminiConnection } from "./geminiAI/gemini.service"
import { cacheSession, getCacheHistory, getCacheSession } from "./interview.cache"


//utility function

export const createInterview = async (context: InterviewContext, userId: string) => {
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

export const startInterview = async (interviewId: string, userId: string) => {
    const context = await interviewRepository.fetchInterview(interviewId)
    const profile = await findUserProfile(userId)
    if (context.userId !== userId) {
        throw new AppError(400, 'This interview does not belong to the user')
        return
    }
    if (!profile) {
        throw new AppError(400, 'Profile not found')
        return
    }
    const prompt = systemPrompt(context, profile.resumeText)
    const sessionId = crypto.randomUUID()
    const data = {
        sessionId,
        userId,
        interviewId,
        startedAt: new Date(),
        prompt,
        geminiToken: ''
    }
    const cache = await cacheSession(data)
    return sessionId
}

export const setupGemini = async (sessionId: string, userId: string) => {
    const session = sessions.get(sessionId)
    if (!session) return
    const cacheSession = await getCacheSession(sessionId)
    if (!cacheSession) {
        session.socket.close(1008, 'Session not found')
        return
    }
    if (userId !== cacheSession.userId) {
        session.socket.close(1008, 'This session does not belong to the user')
        return
    }
    const cacheHistory = await getCacheHistory(sessionId)
    const geminiSession = await setupGeminiConnection(sessionId, cacheSession.prompt)
    session.geminiSocket = geminiSession
    if (cacheHistory.length <= 1) {
        geminiSession?.sendRealtimeInput({
            text: 'Start the interview and follow the system instructions accordingly'
        })
    }
    else {
        geminiSession?.sendRealtimeInput({
            text: `This is a continuation of an interview which was disconnected due 
            to some issues so continue the interview gracefully, here is the conversation 
            of the interview before getting disconnected: ${JSON.stringify(cacheHistory)}`
        })
    }
}

export const processCandidateMessage = async (sessionId: string, message: ClientResponse) => {
    const cacheSession = await getCacheSession(sessionId)
    const session = sessions.get(sessionId)
    const userSocket = session?.socket
    if (!session) {
        userSocket?.close(1008, 'Session not found')
        return
    }
    if (session.geminiSocket) {
        if (message.type === 'candidate_audio') {
            session.geminiSocket.sendRealtimeInput({
                audio: {
                    data: message.data,
                    mimeType: 'audio/pcm;rate=16000'
                }
            })
        }
    }
}

export const endInterview = async (sessionId: string) => {
    await cleanupSession(sessionId, 'client_ended')
}
