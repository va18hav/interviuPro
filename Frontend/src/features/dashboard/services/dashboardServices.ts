import { apiClient } from "../../../utils/apiClient";
import type { DashboardAPIResponse, SessionSummary } from "../types/dashboard.types";

export const getDashboardData = async (): Promise<SessionSummary[]> => {
    const response = await apiClient.get<DashboardAPIResponse>('/dashboard/get')
    return response.data.data ?? []
}
