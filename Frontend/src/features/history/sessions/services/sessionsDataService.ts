import { apiClient } from "../../../../utils/apiClient";
import { SessionsDataAPIResponse } from "../types/sessionsData.types";

export const getSessionsData = async () => {
    const response = await apiClient.get<SessionsDataAPIResponse>('/session/get-all')
    return response.data.data
}