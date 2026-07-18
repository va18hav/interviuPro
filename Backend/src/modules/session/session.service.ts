import { setupGeminiConnection } from "../../aiUtils/geminiAI/gemini.service"
import { technicalRoundPrompt, behavioralRoundPrompt, designRoundPrompt, testCodingRoundPrompt } from "../../aiUtils/geminiAI/prompts"
import { AppError } from "../../utils/appError"
import { findUserProfile, getResume } from "../../utils/dbservices"
import { fetchInterview } from "../interview/interview.repository"
import { cleanupSession, sessions } from "./session"
import { cacheInterviewContext, cacheSession, getCacheHistory, getCacheInterviewContext, getCacheSession } from "./session.redis"
import * as sessionRepository from './session.repository'
import { ClientResponse, RoundType } from "./session.types"

export const startInterview = async (interviewId: string, userId: string, type: RoundType, duration: number) => {
    const context = await fetchInterview(interviewId)
    if (!context) throw new AppError(400, 'Interview not found')
    const resume = await getResume(userId)
    if (context.userId !== userId) {
        throw new AppError(400, 'This interview does not belong to the user')
        return
    }
    if (!resume) {
        throw new AppError(400, 'Resume not found')
        return
    }

    let prompt = ''
    if (type === RoundType.TECHNICAL_CODING) {
        // prompt = technicalRoundPrompt(context, resume.resumeText)
        // ↑ PRODUCTION — swap for line below to test the editor pipeline:
        prompt = testCodingRoundPrompt()
    } else if (type === RoundType.SYSTEM_DESIGN) {
        prompt = designRoundPrompt(context, resume.resumeText)
    } else if (type === RoundType.BEHAVIORAL) {
        prompt = behavioralRoundPrompt(context, resume.resumeText)
    } else {
        throw new AppError(400, 'Invalid round type')
    }

    const sessionId = crypto.randomUUID()
    const data = {
        sessionId,
        userId,
        interviewId,
        type,
        startedAt: new Date(),
        duration,
        elapsedSeconds: 0,
        prompt,
        geminiToken: ''
    }
    const cache = await cacheSession(data)
    const checkCacheContext = await getCacheInterviewContext(interviewId)
    if (checkCacheContext) return { interviewId, sessionId }
    const contextCache = await cacheInterviewContext(interviewId, context)
    return { interviewId, sessionId, title: context.title }
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
    const userSocket = session?.socket
    const cacheHistory = await getCacheHistory(sessionId)
    const geminiSession = await setupGeminiConnection(sessionId, cacheSession.prompt)
    session.geminiSocket = geminiSession
    session.timerStartedAt = new Date()
    const remainingSeconds = (cacheSession.duration * 60) - cacheSession.elapsedSeconds
    userSocket.send(JSON.stringify({
        type: 'timer-info',
        data: remainingSeconds
    }))
    if (session.timer) clearTimeout(session.timer)
    if (session.graceTimer) clearTimeout(session.graceTimer)
    session.timer = setTimeout(() => {
        console.log('time-up!')
        geminiSession?.sendRealtimeInput({
            text: 'SYSTEM: wrap_up_interview now.'
        })
        session.graceTimer = setTimeout(async () => {
            await cleanupSession(sessionId, 'duration_up')
        }, remainingSeconds)
    }, remainingSeconds * 1000)
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
        } else if (message.type === 'candidate_code') {
            session.geminiSocket.sendRealtimeInput({
                text: `[EDITOR_UPDATE] The candidate's current code (${message.language}):\n\`\`\`${message.language}\n${message.code}\n\`\`\``
            })
        }
    }
}

export const getSessionMeta = async (sessionId: string) => {
    const cached = await getCacheSession(sessionId)
    if (!cached) throw new AppError(404, 'Session not found')
    return { type: cached.type }
}

export const endInterview = async (sessionId: string) => {
    await cleanupSession(sessionId, 'client_ended')
}

export const getAllSessions = async (userId: string) => {
    const result = await sessionRepository.getAllSessions(userId)
    if (!result) throw new AppError(400, 'No Sessions found')
    return result
}

export const getSession = async (sessionId: string, userId: string) => {
    const result = await sessionRepository.getSession(sessionId)
    if (!result) throw new AppError(400, 'No session found')
    if (result.interview.userId !== userId) throw new AppError(400, 'The session does not belong to the user')
    return result
}

export const getTranscript = async (sessionId: string, userId: string) => {
    const result = await sessionRepository.getTranscript(sessionId)
    if (!result?.transcript) throw new AppError(400, 'No Transcript found for this session')
    if (result.interview.userId !== userId) throw new AppError(400, 'The session does not belong to the user')
    return result
}