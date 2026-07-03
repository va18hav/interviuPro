import { prisma } from '../../lib/prisma'

export const fetchUserData = async (userId: string) => {
    return await prisma.user.findUnique({
        where: { id: userId },
        select: {
            onboarding_step1: true,
            onboarding_step2: true,
            email: true,
            profiles: {
                select: {
                    firstName: true,
                    lastName: true,
                    skills: true
                }
            }
        }
    })
}

export const fetchDashboardData = async (userId: string) => {
    return await prisma.session.findMany({
        where: { interview: { userId } },
        orderBy: { startedAt: 'desc' },
        select: {
            id: true,
            startedAt: true,
            duration: true,
            type: true,
            interview: { select: { title: true, } },
            feedback: { select: { overallScore: true, verdict: true } }
        }
    })
}

