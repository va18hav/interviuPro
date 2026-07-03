import { useQuery } from '@tanstack/react-query'
import * as dashboardService from '../services/dashboardServices'
import type { DashboardStats, SessionSummary } from '../types/dashboard.types'

const computeStats = (sessions: SessionSummary[]): DashboardStats => {
    const sessionsWithScore = sessions.filter(s => s.feedback?.overallScore != null)
    const averageScore = sessionsWithScore.length > 0
        ? sessionsWithScore.reduce((sum, s) => sum + s.feedback!.overallScore, 0) / sessionsWithScore.length
        : 0
    const totalMinutes = sessions.reduce((sum, s) => sum + (s.duration ?? 0), 0)

    return {
        totalSessions: sessions.length,
        averageScore: Math.round(averageScore),
        totalHours: parseFloat((totalMinutes / 60).toFixed(1)),
    }
}

export const useDashboardData = () => {
    const { data: dashboardData = [], isPending, isError } = useQuery({
        queryKey: ['dashboard'],
        queryFn: dashboardService.getDashboardData,
        staleTime: 1000 * 60 * 5
    })

    return {
        dashboardData,
        stats: computeStats(dashboardData ?? []),
        loadingDashboardData: isPending,
        isError,
    }
}

