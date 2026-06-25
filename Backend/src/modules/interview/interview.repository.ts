import { prisma } from '../../lib/prisma'
import { InterviewContext } from './interview.types'
import { AppError } from '../../utils/appError'
import { SessionEnd } from './interview.session'
import { Prisma } from '../../generated/prisma/client'

export const createInterview = async (context: InterviewContext, userId: string) => {
    const interview = await prisma.interview.create({
        data: {
            userId,
            type: context.type,
            role: context.role,
            title: context.title,
            experience: context.experience,
            skills: context.skills,
            jobDescription: context?.jobDescription,
            duration: context.duration
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
            type: true,
            skills: true,
            experience: true,
            jobDescription: true,
            duration: true
        }
    })
    if (!interview) {
        throw new AppError(404, 'Interview Not Found')
    }
    return interview
}

export const createSession = async (sessionEnd: SessionEnd) => {
    const session = await prisma.session.create({
        data: {
            id: sessionEnd.sessionId,
            interviewId: sessionEnd.interviewId,
            startedAt: sessionEnd.startedAt,
            endedAt: sessionEnd.endedAt,
            duration: sessionEnd.duration,
            transcript: sessionEnd.history as unknown as Prisma.InputJsonValue
        }
    })
}

//   id             String     @id @default(uuid())
//   userId         String
//   title          String
//   type           String
//   role           String
//   skills         String
//   jobDescription String?
//   duration       Int