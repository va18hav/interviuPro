export interface SessionData {
    type: string
    feedback: {
        overallScore: number
    } | null
}

export interface InterviewData {
    id: string
    title: string
    role: string
    skills: string[]
    sessions: SessionData[] | []
}

export interface InterviewsDataAPIResponse {
    success: boolean
    message: string
    data: InterviewData[]
}

// where: { userId },
//         orderBy: { createdAt: 'desc' },
//         select: {
//             id: true,
//             title: true,
//             role: true,
//             sessions: {
//                 select: {
//                     type: true,
//                     feedback: { select: { overallScore: true } }
//                 }
//             }
//         }