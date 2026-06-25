import Redis from 'ioredis'

export const redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,

    // Retry with exponential backoff — don't flood Redis if it's down
    retryStrategy(times) {
        if (times > 5) {
            console.error('❌ Redis: Max retries reached. Giving up.')
            return null
        }
        const delay = Math.min(times * 200, 2000)
        console.warn(`⚠️  Redis: Retry attempt ${times}, waiting ${delay}ms...`)
        return delay
    },

    // Don't throw on connection failure — let the event listeners handle it
    lazyConnect: false,
    maxRetriesPerRequest: 3,
})

redis.on('connect', () => console.log('✅ Redis: Connected'))
redis.on('ready', () => console.log('✅ Redis: Ready to accept commands'))
redis.on('error', (err) => console.error('❌ Redis Error:', err.message))
redis.on('close', () => console.warn('⚠️  Redis: Connection closed'))
redis.on('reconnecting', () => console.log('🔄 Redis: Reconnecting...'))
