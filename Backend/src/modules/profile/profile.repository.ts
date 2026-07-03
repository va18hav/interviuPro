import { prisma } from '../../lib/prisma'
import { CreateProfileInput, ProfileOutput, UpdateProfileInput } from './profile.types'

export const findUserById = async (userId: string) => {
    return await prisma.user.findUnique({
        where: { id: userId },
        select: {
            email: true,
            isEmailVerified: true
        }
    })
}

export const findUserProfile = async (userId: string) => {
    return await prisma.user.findUnique({
        where: { id: userId },
        select: {
            email: true,
            onboarding_step1: true,
            onboarding_step2: true,
            profiles: {
                select: {
                    firstName: true,
                    lastName: true,
                    skills: true,
                    credits: true,
                    updatedAt: true
                }
            },
            resume: {
                select: {
                    resumeUrl: true
                }
            }
        }
    })
}

export const createProfile = async (data: CreateProfileInput) => {
    return await prisma.profile.create({
        data,
        select: {
            firstName: true,
            lastName: true,
            skills: true,
            credits: true
        }
    })
}

export const updateProfile = async (userId: string, data: UpdateProfileInput) => {
    return await prisma.profile.update({
        where: { userId },
        data,
        select: {
            firstName: true,
            lastName: true,
            skills: true,
            credits: true
        }
    })
}

export const onboardingStep1 = async (userId: string) => {
    return await prisma.user.update(
        {
            where: { id: userId },
            data: {
                onboarding_step1: true
            }
        }
    )
}
