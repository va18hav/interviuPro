import { useMutation } from "@tanstack/react-query";
import * as createinterviewSerivce from '../services/createInterviewService'
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useCreateInterview = () => {
    const navigate = useNavigate()
    const { mutate, isPending, isError } = useMutation({
        mutationFn: createinterviewSerivce.createInterview,
        onSuccess: ((interviewId) => {
            navigate(`/interview/setup?interviewId=${interviewId}`)
        }),
        onError: (err) => {
            toast.error(err.message)
        }
    })

    return {
        createInterview: mutate,
        isPending,
        isError,
    }
}

export const useStartSession = () => {
    const navigate = useNavigate()
    const { mutate, isPending } = useMutation({
        mutationFn: createinterviewSerivce.startSession,
        onSuccess: ({ interviewId, sessionId, title }) => {
            navigate(`/interview/${interviewId}/session/${sessionId}`, {
                state:{
                    title
                }
            })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    return { startSession: mutate, isPending }
}