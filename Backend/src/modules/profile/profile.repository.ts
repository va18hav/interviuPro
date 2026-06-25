import { prisma } from '../../lib/prisma'
import { CreateProfileInput, ProfileOutput } from './profile.types'

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
            resumeUrl: true,
            resumeText: true,
            credits: true,
            updatedAt: true
        }
    })
}

export const createProfile = async (data: CreateProfileInput) => {
    return await prisma.profile.create({
        data: {
            userId: data.userId,
            firstName: data.firstName,
            lastName: data.lastName,
            skills: data.skills
        }
    })
}

export const onboardingCompleted = async (userId: string) => {
    return await prisma.user.update(
        {
            where: { id: userId },
            data: {
                onboardingCompleted: true
            }
        }
    )
}

export const uploadResumeDB = async (userId: string, resumeUrl: string, resumeText: string) => {
    return await prisma.profile.update({
        where: { userId: userId },
        data: {
            resumeUrl: resumeUrl,
            resumeText: resumeText
        }
    })
}