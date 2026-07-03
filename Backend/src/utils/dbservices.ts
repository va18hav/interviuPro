import { prisma } from '../lib/prisma'

export const findUserById = async (userId: string) => {
    return await prisma.user.findUnique({
        where: { id: userId }
    })
}

export const findUserProfile = async (userId: string) => {
    return await prisma.profile.findUnique({
        where: { userId },
        select: {
            firstName: true,
            lastName: true,
            skills: true,
            credits: true,
            updatedAt: true
        }
    })
}

export const getResume = async (userId: string) => {
    return await prisma.resume.findUnique({
        where: { userId },
        select: {
            resumeText: true,
            resumeUrl: true,
            resumeKey: true
        }
    })
}