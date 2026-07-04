import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import * as interviewSessionsService from '../services/interviewService'

export const useGetInterviewSessionsData = () => {
    const { interviewId } = useParams()
    const { data: interviewData, isLoading, isError } = useQuery({
        queryKey: ['interview', interviewId],
        queryFn: () => interviewSessionsService.getInterviewAndSessionsData(interviewId!),
        enabled: !!interviewId
    })
    return {
        interviewData,
        isLoading,
        isError
    }
}