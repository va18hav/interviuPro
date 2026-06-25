import { redis } from "../../lib/redis"
import { ConversationEntry } from "./interview.types"

export interface CachedSession {
    sessionId: string
    userId: string
    interviewId: string
    startedAt: Date
    prompt: string
    geminiToken: string | null | undefined
}

const sessionKey = (sessionId: string) => `session:${sessionId}`
const historyKey = (sessionId: string) => `history:${sessionId}`

export const cacheSession = async (data: CachedSession) => {
    const key = sessionKey(data.sessionId)
    await redis.hset(key, {
        sessionId: data.sessionId,
        userId: data.userId,
        interviewId: data.interviewId,
        startedAt: data.startedAt.toISOString(),
        prompt: data.prompt,
        geminiToken: data.geminiToken ?? ""
    })
    await redis.expire(key, 3600)
}

export const updateGeminiToken = async (sessionId: string, token: string) => {
    const key = sessionKey(sessionId)
    await redis.hset(key, 'geminiToken', token)
}

export const cacheHistory = async (sessionId: string, message: ConversationEntry) => {
    const key = historyKey(sessionId)
    await redis.rpush(key, JSON.stringify(message))
    await redis.expire(key, 3600)
}

export const getCacheSession = async (sessionId: string): Promise<CachedSession | null> => {
    const key = sessionKey(sessionId)
    const data = await redis.hgetall(key)
    if (!Object.keys(data).length) {
        return null;
    }
    return {
        sessionId: data.sessionId,
        userId: data.userId,
        interviewId: data.interviewId,
        startedAt: new Date(data.startedAt),
        prompt: data.prompt,
        geminiToken: data.geminiToken
    }
}

export const getCacheHistory = async (sessionId: string) => {
    const key = historyKey(sessionId)
    const messages = await redis.lrange(key, 0, -1)
    return messages.map(m => JSON.parse(m))
}

export const deleteCacheSession = async (sessionId: string) => {
    const deleted = await redis.del(
        sessionKey(sessionId),
        historyKey(sessionId)
    )
}

