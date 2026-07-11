import { prisma } from '../../lib/prisma'

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

