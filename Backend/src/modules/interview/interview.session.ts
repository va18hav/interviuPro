import { WebSocket } from "ws"
import type { ConversationEntry, ConversationHistory } from "./interview.types"
import { createSession } from "./interview.repository"
import { deleteCacheSession, getCacheHistory, getCacheSession, pauseTimer } from "./interview.cache"

export interface SessionData {
    socket: WebSocket
    geminiSocket?: any,
    timer?: NodeJS.Timeout,
    graceTimer?: NodeJS.Timeout,
    timerStartedAt?: Date
}

export interface SessionEnd {
    interviewId: string,
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
    if (!session) return
    if (!cacheSession) return
    const currentSegmentElapsed = session.timerStartedAt
        ? Math.floor((Date.now() - session.timerStartedAt.getTime()) / 1000)
        : 0
    await pauseTimer(sessionId, currentSegmentElapsed)

    const history = await getCacheHistory(sessionId)
    const endedAt = new Date()
    const sessionEnd = {
        interviewId: cacheSession.interviewId,
        sessionId: cacheSession.sessionId,
        startedAt: cacheSession.startedAt,
        endedAt,
        duration: cacheSession.elapsedSeconds + currentSegmentElapsed,
        history
    }
    clearTimeout(session.timer)
    clearTimeout(session.graceTimer)

    if (cleanupReason === 'disconnected') {
        console.log(sessionEnd.duration)
        if (session.timerStartedAt) {
            //Ghost Timer
        }
    }
    if (cleanupReason === 'client_ended' || cleanupReason === 'duration_up') {
        await createSession(sessionEnd)
        await deleteCacheSession(cacheSession.sessionId)
    }
    sessions.delete(sessionId)               // ← then delete
    session.socket.close(1000, 'Interview ended')
    session.geminiSocket?.close()
    console.log('Gemini session and WebSocket closed')
}