import { useQuery } from "@tanstack/react-query";
import { SessionsData } from "../types/sessionsData.types";
import * as sessionsDataService from '../services/sessionsDataService'

export const useGetSessionsData = () => {
    const { data, isLoading, isError }
        : { data: SessionsData[], isLoading: boolean, isError: boolean } = useQuery({
            queryKey: ['sessions'],
            queryFn: sessionsDataService.getSessionsData
        })
    return {
        sessions: data,
        isLoading,
        isError
    }
}