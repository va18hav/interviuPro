import { useQuery } from "@tanstack/react-query";
import * as getMetaDataService from '../services/getMetadataService'
import { useParams } from "react-router-dom";

export const useGetMetaData = () => {

    const { interviewId } = useParams()
    const { data, isPending } = useQuery({
        queryKey: ['interview-metaData', interviewId],
        queryFn: () => getMetaDataService.getMetadata(interviewId)
    })
    const title = data?.title ?? ''
    return {
        title,
        isPending
    }
}