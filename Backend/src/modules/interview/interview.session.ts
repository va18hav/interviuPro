import { WebSocket } from "ws"
import type { ConversationEntry, ConversationHistory } from "./interview.types"
import { createSession } from "./interview.repository"
import { deleteCacheSession, getCacheHistory, getCacheSession } from "./interview.cache"

export interface SessionData {
    socket: WebSocket
    geminiSocket?: any,
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

export const cleanupSession = async (sessionId: string, cleanupReason: 'disconnected' | 'client_ended') => {
    const cacheSession = await getCacheSession(sessionId)
    const history = await getCacheHistory(sessionId)
    if (!cacheSession) return
    const endedAt = new Date()
    const duration = Math.floor((endedAt.getTime() - cacheSession.startedAt.getTime()) / 1000)
    const sessionEnd = {
        interviewId: cacheSession.interviewId,
        sessionId: cacheSession.sessionId,
        startedAt: cacheSession.startedAt,
        endedAt,
        duration,
        history
    }
    if (cleanupReason === 'client_ended') {
        await createSession(sessionEnd)
        await deleteCacheSession(cacheSession.sessionId)
    }
    const session = sessions.get(sessionId)  // ← get FIRST
    sessions.delete(sessionId)               // ← then delete
    if (session) {
        session.socket.close(1000, 'Interview ended')
        session.geminiSocket?.close()
        console.log('Gemini session and WebSocket closed')
    }
}