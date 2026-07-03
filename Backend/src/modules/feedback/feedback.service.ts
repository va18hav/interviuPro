import { callAI } from "../../aiUtils/anthropicAI/anthropic.service"
import { feedbackPrompt } from "../../aiUtils/anthropicAI/prompt"
import { FeedbackContext, FeedbackData } from "../../aiUtils/anthropicAI/types"
import { AppError } from "../../utils/appError"
import { getCacheHistory, getCacheInterviewContext } from "../session/session.redis"
import * as feedbackRepository from './feedback.repository'

export const generateFeedback = async (interviewId: string, sessionId: string) => {
    let context: FeedbackContext | null = null
    const rawCache = await getCacheInterviewContext(interviewId)
    const history = await getCacheHistory(sessionId)
    if (!history) throw new AppError(400, 'The transcript for this session cannot be found')
    if (rawCache) {
        context = {
            title: rawCache.title,
            role: rawCache.role,
            skills: rawCache.skills,
            experience: rawCache.experience,
            jobDescription: rawCache.jobDescription,
            transcript: history
        }
    }
    else {
        const rawContext = await feedbackRepository.feedbackContext(sessionId)
        if (!rawContext) throw new AppError(400, 'The interview cannot be found for this session')
        context = {
            title: rawContext.interview.title,
            role: rawContext.interview.role,
            skills: rawContext.interview.skills,
            experience: rawContext.interview.experience,
            jobDescription: rawContext.interview.jobDescription,
            transcript: history
        }
    }
    const systemPrompt = feedbackPrompt(context)
    const feedbackData: FeedbackData = await callAI(systemPrompt)
    return feedbackRepository.createFeedback(sessionId, feedbackData)
}

// if (!rawCache) return
//     const history = await getCacheHistory(sessionId)
//     const cacheContext = {
//         title: rawCache.title,
//         role: rawCache.role,
//         skills: rawCache.skills,
//         experience: rawCache.experience,
//         jobDescription: rawCache.jobDescription,
//         transcript: history
//     }