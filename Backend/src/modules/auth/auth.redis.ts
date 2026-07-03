import { redis } from '../../lib/redis'

const getKey = (userId: string) => `otp:${userId}`

export const storeOTP = async (hashedOTP: string, userId: string) => {
    await redis.hset(getKey(userId), {
        userId,
        hashedOTP,
    })
    await redis.expire(getKey(userId), 600)
}

export const getOTP = async (userId: string) => {
    const data = await redis.hgetall(getKey(userId))
    if (!Object.keys(data).length) return null
    return data.hashedOTP
}

export const deleteOTP = async (userId: string) => {
    await redis.del(getKey(userId))
}