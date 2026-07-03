import { apiClient } from "../../../../utils/apiClient";
import type { InterviewAPIResponse, InterviewContext, SessionConfig, StartSessionAPIResponse } from "../types/interviewContext.types";

export const createInterview = async (context: InterviewContext) => {
    const response = await apiClient.post<InterviewAPIResponse>('/interview/create', context)
    return response.data.data.interviewId
}

export const startSession = async ({ interviewId, config }: { interviewId: string, config: SessionConfig }) => {
    const response = await apiClient.post<StartSessionAPIResponse>(`/session/start/${interviewId}`, config)
    return response.data.data
}