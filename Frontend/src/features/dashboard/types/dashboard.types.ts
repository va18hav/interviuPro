export interface SessionSummary {
    id: string;
    startedAt: string;
    duration: number | null;
    type: string;
    interview: {
        title: string;
    };
    feedback: {
        overallScore: number;
        verdict: string;
    } | null;
}

export interface DashboardAPIResponse {
    success: boolean;
    message: string;
    data: SessionSummary[] | undefined
}

export interface DashboardStats {
    totalSessions: number;
    averageScore: number;
    totalHours: number;
}
