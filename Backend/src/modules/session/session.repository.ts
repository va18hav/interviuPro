import { Prisma } from '../../generated/prisma/client'
import { prisma } from '../../lib/prisma'
import { SessionEnd } from './session'


export const createSession = async (sessionEnd: SessionEnd) => {
    const session = await prisma.session.create({
        data: {
            id: sessionEnd.sessionId,
            interviewId: sessionEnd.interviewId,
            type: sessionEnd.type,
            startedAt: sessionEnd.startedAt,
            endedAt: sessionEnd.endedAt,
            duration: sessionEnd.duration,
            transcript: sessionEnd.history as unknown as Prisma.InputJsonValue
        }
    })
}

export const getAllSessions = async (userId: string) => {
    return await prisma.session.findMany({
        where: { interview: { userId } },
        orderBy: { startedAt: 'desc' },
        select: {
            id: true,
            type: true,
            startedAt: true,
            duration: true,
            interview: { select: { title: true, role: true } },
            feedback: { select: { overallScore: true, verdict: true } }
        }
    })
}

export const getSession = async (sessionId: string) => {
    const session = await prisma.session.findUnique({
        where: { id: sessionId },
        select: {
            type: true,
            startedAt: true,
            duration: true,
            interview: {
                select: {
                    userId: true,
                    title: true,
                    role: true,
                    skills: true,
                }
            },
            feedback: {
                select: {
                    overallScore: true,
                    verdict: true,
                    summary: true,
                    strengths: true,
                    focusAreas: true,
                    nextStep: true
                }
            }
        }
    })
    console.dir(session?.feedback, { depth: null });
    console.log(typeof session?.feedback?.nextStep);
    console.log(Array.isArray(session?.feedback?.nextStep))
    return session
}

export const getTranscript = async (sessionId: string) => {
    return await prisma.session.findUnique({
        where: { id: sessionId },
        select: {
            transcript: true,
            interview: { select: { userId: true } }
        }
    })
}
