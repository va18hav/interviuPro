import { apiClient } from "../../../../utils/apiClient";
import { InterviewSessionsDataAPIResponse } from "../types/interviewData.types";

export const getInterviewAndSessionsData = async (interviewId: string) => {
    const response = await apiClient.get<InterviewSessionsDataAPIResponse>(`/interview/all-sessions/${interviewId}`)
    return response.data.data
}