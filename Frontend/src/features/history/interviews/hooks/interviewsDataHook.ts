import { useQuery } from "@tanstack/react-query";
import * as getInterviewsDataService from '../services/getInterviewsService'

export const useGetInterviewsData = () => {
    const { data: interviews = [], isLoading, isError } = useQuery({
        queryKey: ['interviews'],
        queryFn: getInterviewsDataService.getInterviewsdata,
    })
    return {
        interviews,
        isLoading,
        isError
    }
}