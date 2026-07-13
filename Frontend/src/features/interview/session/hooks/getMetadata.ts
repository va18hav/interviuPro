import { useQuery } from "@tanstack/react-query";
import * as getMetaDataService from '../services/getMetadataService'
import * as getSessionMetaService from '../services/getSessionMetaService'
import { useParams } from "react-router-dom";
import { RoundType } from "../types/session.types";

export const useGetMetaData = () => {

    const { interviewId, sessionId } = useParams()

    const { data: interviewData, isPending: isInterviewPending } = useQuery({
        queryKey: ['interview-metaData', interviewId],
        queryFn: () => getMetaDataService.getMetadata(interviewId!),
        enabled: !!interviewId
    })

    const { data: sessionMetaData, isPending: isSessionMetaPending } = useQuery({
        queryKey: ['session-meta', sessionId],
        queryFn: () => getSessionMetaService.getSessionMeta(sessionId!),
        enabled: !!sessionId
    })

    const title = interviewData?.title ?? ''
    const roundType = sessionMetaData?.type ?? null

    return {
        title,
        roundType,
        isPending: isInterviewPending || isSessionMetaPending
    }
}