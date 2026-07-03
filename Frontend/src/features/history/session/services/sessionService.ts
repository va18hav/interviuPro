import { apiClient } from "../../../../utils/apiClient";
import { SessionDataAPIResponse, SessionTranscriptAPIResponse } from "../types/session.types";

export const getSessionData = async (sessionId: string) => {
    const response = await apiClient.get<SessionDataAPIResponse>(`/session/${sessionId}`)
    return response.data.data
}

export const getSessionTranscript = async (sessionId: string) => {
    const response = await apiClient.get<SessionTranscriptAPIResponse>(`session/transcript/${sessionId}`)
    return response.data.data.transcript
}