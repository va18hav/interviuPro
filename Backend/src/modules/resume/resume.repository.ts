import { prisma } from '../../lib/prisma'

export const onboardingStep2 = async (userId: string) => {
    return await prisma.user.update(
        {
            where: { id: userId },
            data: {
                onboarding_step2: true
            }
        }
    )
}

export const uploadResumeDB = async (userId: string, resumeUrl: string, resumeKey: string, resumeText: string) => {
    return await prisma.resume.create({
        data: {
            userId,
            resumeText,
            resumeKey,
            resumeUrl
        },
        select: {
            resumeUrl: true
        }
    })
}

export const updateResume = async (userId: string, resumeUrl: string, resumeKey: string, resumeText: string) => {
    return await prisma.resume.update({
        where: { userId },
        data: {
            resumeText,
            resumeUrl,
            resumeKey
        },
        select: {
            resumeUrl: true
        }
    })
}