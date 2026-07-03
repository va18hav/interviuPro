export interface SessionHistoryData {
    id: string
    type: string
    duration: number
    startedAt?: string
    feedback: {
        overallScore: number
        verdict: string
        strengths: string[]
    } | null
}


export interface InterviewSessionsData {
    userId: string
    title: string
    jobDescription: string
    role: string
    skills: string[]
    experience: string
    sessions: SessionHistoryData[] | []
}

export interface InterviewSessionsDataAPIResponse {
    success: boolean
    message: string
    data: InterviewSessionsData | undefined
}
