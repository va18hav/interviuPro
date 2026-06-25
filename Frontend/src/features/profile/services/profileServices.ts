import axios from "axios"
import { apiClient } from "../../../utils/apiClient"
import type { CreateProfileInput } from '../profile.types'

export const createProfile = async (data: CreateProfileInput) => {
    try {
        const response = await apiClient.post('/profile/create', data)
        return response
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data
        }
        else {
            return { success: false, message: 'An Unexpected error occured' }
        }
    }
}

export const uploadResume = async (file: File) => {
    const formData = new FormData()
    formData.append('resume', file)
    try {
        const response = await apiClient.post('/profile/resume', formData)
        return response
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data
        }
        else {
            return { success: false, message: 'An Unexpected error occured' }
        }
    }
}