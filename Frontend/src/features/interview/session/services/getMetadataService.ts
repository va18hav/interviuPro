import { apiClient } from "../../../../utils/apiClient";

interface InterviewMetadataAPIResponse {
    success: boolean
    message: string
    data: {
        title: string
    } | undefined
}

export const getMetadata = async (interviewId: string) => {
    const response = await apiClient.get<InterviewMetadataAPIResponse>(`/interview/get/${interviewId}`)
    return response.data.data
}