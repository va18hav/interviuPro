import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as authService from '../services/authService'
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useRegister = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { mutate, isPending, isSuccess } = useMutation({
        mutationFn: authService.register,
        onSuccess: () => {
            queryClient.clear()
            navigate('/verify-email')
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })
    return {
        register: mutate,
        registerPending: isPending,
        registerSuccess: isSuccess
    }
}

export const useVerifyEmail = () => {
    const queryClient = useQueryClient()
    const { mutate, isPending, isSuccess } = useMutation({
        mutationFn: authService.verifyEmail,
        onSuccess: () => {
            queryClient.clear()
            toast.success('OTP verified successfully')
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })
    return {
        verify: mutate,
        verifying: isPending,
        verified: isSuccess
    }
}

export const useSendOtp = () => {
    const { mutate, isPending, isSuccess } = useMutation({
        mutationFn: authService.sendOtp,
        onSuccess: () => {
            toast.success('OTP sent to your email')
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })
    return {
        resend: mutate,
        sending: isPending,
        sent: isSuccess
    }
}

export const useGetUser = () => {
    const { data, isPending, isSuccess, isError } = useQuery({
        queryKey: ['user'],
        queryFn: authService.getUser
    })
    return {
        user: data,
        fetchingUser: isPending,
        userFetched: isSuccess,
        userNotFetched: isError
    }
}

export const useLogin = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { mutate, isPending, isSuccess } = useMutation({
        mutationFn: authService.login,
        onSuccess: () => {
            queryClient.clear()
            navigate('/dashboard')
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })
    return {
        login: mutate,
        loginPending: isPending,
        loginSuccess: isSuccess
    }
}

export const useLogout = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: authService.logout,
        onSuccess: (message: string) => {
            queryClient.clear()
            navigate('/')
            toast.success(message)
        },
        onError: (err) => {
            toast.error(err.message)
        }

    })
    return {
        logout: mutate,
        loggingOut: isPending
    }
}

/**
 * Simple redirect hooks — no mutation needed.
 * Clicking these sends the browser to the backend OAuth entry points.
 * The backend handles code exchange, sets an httpOnly cookie, and redirects
 * the browser back to /oauth-success or /oauth-error.
 */
export const useOAuthRedirect = () => {
    return {
        loginWithGoogle: authService.redirectToGoogleOAuth,
        loginWithGithub: authService.redirectToGithubOAuth,
    }
}