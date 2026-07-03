import { WebSocket } from "ws"
import type { ConversationEntry, ConversationHistory } from "./session.types"
import { createSession } from "./session.repository"
import { deleteCacheSession, getCacheHistory, getCacheInterviewContext, getCacheSession, pauseTimer } from "./session.redis"
import { generateFeedback } from "../feedback/feedback.service"
import { feedbackContext } from "../feedback/feedback.repository"
import { FeedbackContext } from "../../aiUtils/anthropicAI/types"

export interface SessionData {
    socket: WebSocket
    geminiSocket?: any,
    timer?: NodeJS.Timeout,
    graceTimer?: NodeJS.Timeout,
    timerStartedAt?: Date
}

export interface SessionEnd {
    interviewId: string,
    type: string
    sessionId: string
    startedAt: Date,
    endedAt: Date,
    duration: number,
    history: ConversationEntry[]
}

export const sessions = new Map<string, SessionData>()

//session cleanup function

export const cleanupSession = async (sessionId: string, cleanupReason: 'disconnected' | 'client_ended' | 'duration_up') => {
    const cacheSession = await getCacheSession(sessionId)
    const session = sessions.get(sessionId)
    const history = await getCacheHistory(sessionId)
    if (!session) return
    if (!history.length) return
    if (!cacheSession?.interviewId) return
    const currentSegmentElapsed = session.timerStartedAt
        ? Math.floor((Date.now() - session.timerStartedAt.getTime()) / 1000)
        : 0
    await pauseTimer(sessionId, currentSegmentElapsed)
    const endedAt = new Date()
    const sessionEnd = {
        interviewId: cacheSession.interviewId,
        type: cacheSession.type,
        sessionId: cacheSession.sessionId,
        startedAt: cacheSession.startedAt,
        endedAt,
        duration: Math.round((cacheSession.elapsedSeconds + currentSegmentElapsed) / 60),
        history
    }
    clearTimeout(session.timer)
    clearTimeout(session.graceTimer)

    if (cleanupReason === 'disconnected') {
        console.log(sessionEnd.duration)
        console.log('Client disconnected')
        if (session.timerStartedAt) {
            //Ghost Timer
        }
    }
    if (cleanupReason === 'client_ended' || cleanupReason === 'duration_up') {
        console.log(sessionEnd.duration)
        if (cleanupReason === 'client_ended') console.log('client ended')
        await createSession(sessionEnd)
        await deleteCacheSession(cacheSession.sessionId)
    }
    sessions.delete(sessionId)               // ← then delete
    session.socket.close(1000, 'Interview ended')
    session.geminiSocket?.close()
    console.log('Gemini session and WebSocket closed')
}