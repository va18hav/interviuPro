import { FeedbackData } from '../../aiUtils/anthropicAI/types'
import { prisma } from '../../lib/prisma'

export const feedbackContext = async (sessionId: string) => {
    return await prisma.session.findUnique({
        where: {
            id: sessionId,
        },
        select: {
            transcript: true,
            interview: {
                select: {
                    userId: true,
                    title: true,
                    role: true,
                    skills: true,
                    experience: true,
                    jobDescription: true
                }
            }
        }
    })
}

export const createFeedback = async (sessionId: string, feedbackData: FeedbackData) => {
    const {
        overallScore,
        technicalScore,
        communicationScore,
        problemSolvingScore,
        verdict,
        summary,
        strengths,
        focusAreas,
        nextSteps
    } = feedbackData
    return await prisma.feedback.create({
        data: {
            sessionId,
            overallScore,
            technicalScore,
            communicationScore,
            problemSolvingScore,
            verdict,
            summary,
            strengths,
            focusAreas,
            nextStep: nextSteps
        },
        select: {
            sessionId: true
        }
    })
}
