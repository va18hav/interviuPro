export interface SessionsData {
    id: string
    type: string
    startedAt: string
    duration: number
    interview: {
        title: string
        role: string
    }
    feedback: {
        overallScore: number
        verdict: string
    }
}

export interface SessionsDataAPIResponse {
    success: boolean
    message: string
    data: SessionsData[]
}