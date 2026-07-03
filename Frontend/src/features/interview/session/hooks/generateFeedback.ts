import { useMutation } from "@tanstack/react-query";
import * as feedbackService from '../services/generateFeedback'
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useGenerateFeedback = () => {

    const navigate = useNavigate()

    const { mutate } = useMutation({
        mutationFn: feedbackService.generateFeedback,
        onSuccess: ({ sessionId }) => {
            navigate(`/sessions/${sessionId}`)
        },
        onError: (err) => {
            toast.error(err.message || 'Something went wrong')
            navigate('/dashboard')
        }
    })
    return {
        generateFeedback: mutate,
    }
}