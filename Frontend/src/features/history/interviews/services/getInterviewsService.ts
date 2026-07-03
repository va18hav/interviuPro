import { apiClient } from "../../../../utils/apiClient";
import { InterviewsDataAPIResponse } from "../types/interviewsData.types";

export const getInterviewsdata = async () => {
    const response = await apiClient.get<InterviewsDataAPIResponse>('/interview/all-interviews')
    return response.data.data
}