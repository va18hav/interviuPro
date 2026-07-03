import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as profileService from '../services/profileServices'
import { toast } from "sonner";

export const useGetProfileData = () => {
    const { data = {}, isPending, isError } = useQuery({
        queryKey: ['profile-data'],
        queryFn: profileService.getUserProfile,
        staleTime: 1000 * 60 * 10

    })
    const firstName = data?.profiles?.firstName ?? ''
    const lastName = data?.profiles?.lastName ?? ''
    const onboardingStep1 = data?.onboarding_step1
    const onboardingStep2 = data?.onboarding_step2
    return {
        profile: data,
        firstName,
        lastName,
        onboardingStep1,
        onboardingStep2,
        loadingProfileData: isPending,
        profileError: isError
    }
}

export const useUploadProfileData = () => {
    const queryClient = useQueryClient()
    const { mutate, isPending, isSuccess } = useMutation({
        mutationKey: ['onboarding'],
        mutationFn: profileService.createProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['profile-data']
            })
        },
        onError: (err) => {
            toast.error(err.message || 'Something went wrong, please try again')
        }
    })
    return {
        createProfile: mutate,
        isPending,
        isSuccess
    }
}

export const useUploadResume = () => {
    const queryClient = useQueryClient()
    const { mutate, isPending, isSuccess } = useMutation({
        mutationKey: ['resume-upload'],
        mutationFn: profileService.uploadResume,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['profile-data']
            })
        },
        onError: (err) => {
            toast.error(err.message || 'Something went wrong')
        }
    })
    return {
        uploadResume: mutate,
        isPending,
        isSuccess
    }
}

export const useUpdateProfile = () => {
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationKey: ['profile-update'],
        mutationFn: profileService.updateProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['profile-data']
            })
            toast.success('Profile updated successfully')
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to update profile')
        }
    })
    return {
        updateProfile: mutate,
        isUpdatingProfile: isPending
    }
}

export const useUpdateResume = () => {
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationKey: ['resume-update'],
        mutationFn: profileService.updateResume,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['profile-data']
            })
            toast.success('Resume replaced successfully')
        },
        onError: (err) => {
            toast.error(err.message || 'Something went wrong')
        }
    })
    return {
        updateResume: mutate,
        isUpdatingResume: isPending
    }
}

import * as authService from "../../auth/services/authService"

export const useUpdatePassword = () => {
    const { mutate, isPending } = useMutation({
        mutationKey: ['update-password'],
        mutationFn: authService.resetPassword,
        onSuccess: () => {
            toast.success('Password updated successfully')
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to update password')
        }
    })
    return {
        updatePassword: mutate,
        isUpdatingPassword: isPending
    }
}