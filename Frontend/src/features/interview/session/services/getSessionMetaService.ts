import { apiClient } from "../../../../utils/apiClient";
import { RoundType } from "../types/session.types";

interface SessionMetaAPIResponse {
    success: boolean
    message: string
    data: {
        type: RoundType
    } | undefined
}

export const getSessionMeta = async (sessionId: string) => {
    const response = await apiClient.get<SessionMetaAPIResponse>(`/session/meta/${sessionId}`)
    return response.data.data
}
