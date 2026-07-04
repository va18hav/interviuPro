import { useQuery } from '@tanstack/react-query'
import * as sessionService from '../services/sessionService'
import { useParams } from 'react-router-dom'

export const useSessionData = () => {
    const { sessionId } = useParams()
    const { data: sessionData, isLoading, isError } = useQuery({
        queryKey: ['session', sessionId],
        queryFn: () => sessionService.getSessionData(sessionId!),
        enabled: !!sessionId,
        staleTime: 1000 * 60 * 10
    })

    return {
        sessionData,
        isLoading,
        isError
    }
}

export const useSessionTranscript = (isEnabled = true) => {
    const { sessionId } = useParams()
    const { data: transcript, isError, isLoading } = useQuery({
        queryKey: ['transcript', sessionId],
        queryFn: () => sessionService.getSessionTranscript(sessionId!),
        staleTime: 1000 * 60 * 10,
        enabled: isEnabled && !!sessionId
    })

    return {
        transcript,
        isError,
        isLoading
    }
}