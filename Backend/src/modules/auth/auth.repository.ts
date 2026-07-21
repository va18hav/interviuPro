import { prisma } from '../../lib/prisma'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

export const findUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: { email }
    })
}

export const createUser = async (data: { email: string, hashedPassword: string }) => {
    return await prisma.user.create({
        data: {
            email: data.email,
            hashedPassword: data.hashedPassword
        },
    })
}

export const createGoogleUser = async (data: { email: string, hashedPassword: string }) => {
    return await prisma.user.create({
        data: {
            email: data.email,
            hashedPassword: data.hashedPassword,
            isEmailVerified: true
        },
    })
}

/**
 * Finds an existing user by email or creates a new one for OAuth providers.
 * Always sets isEmailVerified = true since providers have already verified the email.
 * Uses a random placeholder hash so the non-nullable hashedPassword column is satisfied.
 */
export const upsertOAuthUser = async (email: string, providerTag: 'GOOGLE' | 'GITHUB') => {
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) return existing

    const randomPassword = `${providerTag}_OAUTH_ACCOUNT_${crypto.randomUUID()}`
    const hashedPassword = await bcrypt.hash(randomPassword, 10)

    return await prisma.user.create({
        data: {
            email,
            hashedPassword,
            isEmailVerified: true
        }
    })
}

export const verifyEmail = async (userId: string) => {
    return await prisma.user.update({
        where: { id: userId },
        data: {
            isEmailVerified: true
        },
        select: {
            id: true,
            email: true,
            isEmailVerified: true
        }
    })
}

export const resetPassword = async (userId: string, hashedPassword: string) => {
    return await prisma.user.update({
        where: { id: userId },
        data: { hashedPassword },
        select: { email: true }
    })
}