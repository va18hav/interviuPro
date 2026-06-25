import axios from 'axios'
import { apiClient } from '../../../utils/apiClient'
import type { AuthInput } from '../auth.types'

export const login = async (data: AuthInput) => {
    try {
        const response = await apiClient.post('/auth/login', data, { withCredentials: true })
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

export const register = async (data: AuthInput) => {
    try {
        const response = await apiClient.post('http://localhost:3000/auth/register', data)
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