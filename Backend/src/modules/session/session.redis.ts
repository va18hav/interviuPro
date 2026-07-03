import { JsonValue } from "@prisma/client/runtime/client"
import { redis } from "../../lib/redis"
import { ConversationEntry } from "./session.types"

export interface CachedSession {
    sessionId: string
    userId: string
    interviewId: string
    type: string
    startedAt: Date
    duration: number
    elapsedSeconds: number
    prompt: string
    geminiToken: string | null | undefined
}

export interface CacheInterviewContext {
    userId: string
    title: string
    role: string
    skills: JsonValue
    experience: string
    jobDescription: string | null
}

const sessionKey = (sessionId: string) => `session:${sessionId}`
const historyKey = (sessionId: string) => `history:${sessionId}`
const contextKey = (interviewId: string) => `context:${interviewId}`

export const cacheSession = async (data: CachedSession) => {
    const key = sessionKey(data.sessionId)
    await redis.hset(key, {
        sessionId: data.sessionId,
        userId: data.userId,
        interviewId: data.interviewId,
        type: data.type,
        startedAt: data.startedAt.toISOString(),
        duration: data.duration,
        elapsedSeconds: data.elapsedSeconds,
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

export const cacheInterviewContext = async (interviewId: string, context: CacheInterviewContext) => {
    const key = contextKey(interviewId)
    await redis.hset(key, {
        userId: context.userId,
        title: context.title,
        role: context.role,
        skills: context.skills,
        experience: context.experience,
        jobDescription: context.jobDescription
    })
    await redis.expire(key, 24 * 3600)
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
        type: data.type,
        startedAt: new Date(data.startedAt),
        duration: +data.duration,
        elapsedSeconds: +data.elapsedSeconds,
        prompt: data.prompt,
        geminiToken: data.geminiToken
    }
}

export const getCacheHistory = async (sessionId: string) => {
    const key = historyKey(sessionId)
    const messages = await redis.lrange(key, 0, -1)
    return messages.map(m => JSON.parse(m))
}

export const getCacheInterviewContext = async (interviewId: string): Promise<CacheInterviewContext | null> => {
    const key = contextKey(interviewId)
    const data = await redis.hgetall(key)
    if (!Object.keys(data).length) {
        return null
    }
    return {
        userId: data.userId,
        title: data.title,
        role: data.role,
        skills: data.skills,
        experience: data.experience,
        jobDescription: data.jobDescription
    }
}

export const pauseTimer = async (sessionId: string, elapsedSeconds: number) => {
    const key = sessionKey(sessionId)
    const storedSeconds = await redis.hget(key, 'elapsedSeconds')
    if (!storedSeconds) return
    if (+storedSeconds > 0) {
        elapsedSeconds = +storedSeconds + elapsedSeconds
    }
    await redis.hset(key, 'elapsedSeconds', elapsedSeconds)
}

export const deleteCacheSession = async (sessionId: string) => {
    const deleted = await redis.del(
        sessionKey(sessionId),
        historyKey(sessionId)
    )
}


