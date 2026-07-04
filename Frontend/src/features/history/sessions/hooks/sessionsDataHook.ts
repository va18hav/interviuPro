import { useQuery } from "@tanstack/react-query";
import * as sessionsDataService from '../services/sessionsDataService'

export const useGetSessionsData = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['sessions'],
        queryFn: sessionsDataService.getSessionsData
    })
    return {
        sessions: data,
        isLoading,
        isError
    }
}