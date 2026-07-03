import { apiClient } from "../../../../utils/apiClient";

type GenerateFeedbackInput = {
    interviewId: string
    sessionId: string
}

export const generateFeedback = async ({ interviewId, sessionId }: GenerateFeedbackInput) => {
    const response = await apiClient.post(`/feedback/${sessionId}`, { interviewId })
    return response.data.data
} 