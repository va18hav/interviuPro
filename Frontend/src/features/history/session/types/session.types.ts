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
    technicalScore?: number
    communicationScore?: number
    problemSolvingScore?: number
    verdict: string
    summary: string
    strengths: string[]
    focusAreas: FocusAreas[]
    nextStep: string[]
}

export interface SessionData {
    type: string
    startedAt: string
    duration: number
    feedback: FeedbackData
    interview: InterviewData
}

export interface SessionDataAPIResponse {
    success: boolean
    message: string
    data: SessionData
}

export interface SessionTranscriptObject {
    role: 'user' | 'assistant'
    content: string
}

export type SessionTranscriptData = SessionTranscriptObject[]

export interface SessionTranscriptAPIResponse {
    success: boolean
    message: string
    data: {
        transcript: SessionTranscriptData
    }
}