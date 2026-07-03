import { InputJsonValue, JsonValue } from "@prisma/client/runtime/client"
import { ConversationEntry } from "../../modules/session/session.types"

export interface FeedbackContext {
    title: string
    role: string
    skills: JsonValue
    experience: string
    jobDescription: string | null
    transcript: JsonValue
}

export interface InterviewData {
    userId: string
    title: string
    role: string
    skills: string[]
}

export interface FocusAreas {
    topic: string
    whatWentWrong: string
    whatToStudy: string[]
}

export interface FeedbackData {
    overallScore: number
    verdict: string
    summary: string
    strengths: string[]
    focusAreas: InputJsonValue
    nextSteps: string[]
}