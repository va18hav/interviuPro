import { apiClient } from "../../../utils/apiClient"
import type { CreateProfileInput, CreateProfileResponse, GetProfileDataResponse, UpdateProfileInput, UpdateProfileResponse } from '../types/profile.types'

export const createProfile = async (data: CreateProfileInput) => {
    const response = await apiClient.post<CreateProfileResponse>('/profile', data)
    return response.data.data
}

export const updateProfile = async (data: UpdateProfileInput) => {
    const response = await apiClient.patch<UpdateProfileResponse>('/profile', data)
    return response.data.data
}

export const uploadResume = async (file: File) => {
    const formData = new FormData()
    formData.append('resume', file)
    const response = await apiClient.post('/resume', formData)
    return response.data.data
}

export const updateResume = async (file: File) => {
    const formData = new FormData()
    formData.append('resume', file)
    const response = await apiClient.patch('/resume', formData)
    return response.data.data
}

export const getUserProfile = async () => {
    const response = await apiClient.get<GetProfileDataResponse>('/profile/getProfile')
    return response.data.data
} 