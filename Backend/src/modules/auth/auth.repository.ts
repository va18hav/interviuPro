import { prisma } from '../../lib/prisma'

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