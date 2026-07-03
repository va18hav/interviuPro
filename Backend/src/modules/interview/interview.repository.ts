import { prisma } from '../../lib/prisma'
import { CreateInterviewContext } from './interview.types'
import { AppError } from '../../utils/appError'
import { Prisma } from '../../generated/prisma/client'

export const createInterview = async (context: CreateInterviewContext, userId: string) => {
    const interview = await prisma.interview.create({
        data: {
            userId,
            role: context.role,
            title: context.title,
            experience: context.experience,
            skills: context.skills,
            jobDescription: context?.jobDescription
        },
        select: {
            id: true
        }
    })
    return interview.id
}

export const fetchInterview = async (interviewId: string) => {
    const interview = await prisma.interview.findUnique({
        where: { id: interviewId },
        select: {
            userId: true,
            title: true,
            role: true,
            skills: true,
            experience: true,
            jobDescription: true,
        }
    })
    return interview
}

export const fetchAllInterviews = async (userId: string) => {
    return await prisma.interview.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            title: true,
            role: true,
            skills: true,
            sessions: {
                select: {
                    type: true,
                    feedback: { select: { overallScore: true } }
                }
            }
        }
    })
}

export const fetchInterviewSessions = async (interviewId: string) => {
    return await prisma.interview.findUnique({
        where: { id: interviewId },
        select: {
            userId: true,
            title: true,
            jobDescription: true,
            role: true,
            skills: true,
            experience: true,
            sessions: {
                orderBy: { startedAt: 'desc' },
                select: {
                    id: true,
                    type: true,
                    duration: true,
                    startedAt: true,
                    feedback: { select: { overallScore: true, verdict: true, strengths: true } }
                }
            }
        }
    })
}


