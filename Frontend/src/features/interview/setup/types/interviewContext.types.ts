export interface InterviewContext {
    role: string
    title: string
    skills: string[]
    experience: string
    jobDescription: string
}

export interface InterviewAPIResponse {
    success: boolean
    message: string
    data: {
        interviewId: string
    }
}

export interface SessionConfig {
    type: string
    duration: number
}

export interface StartSessionAPIResponse {
    success: boolean
    message: string
    data: {
        interviewId: string
        sessionId: string
        title: string
    }
}