import { apiClient } from '../../../utils/apiClient'
import type { AuthInput, AuthResponseAPI, LogoutResponse, ResendOtpResponse, UserDataResponse, VerifyEmailResponse } from '../types/auth.types'

export const login = async (data: AuthInput) => {
    const response = await apiClient.post<AuthResponseAPI>('/auth/login', data)
    return response.data.data
}

export const register = async (data: AuthInput) => {
    const response = await apiClient.post<AuthResponseAPI>('auth/register', data)
    return response.data.data
}

export const verifyEmail = async (otp: string) => {
    const response = await apiClient.post<VerifyEmailResponse>('/auth/verify-email', { otp })
    return response.data.data
}

export const sendOtp = async () => {
    const response = await apiClient.post<ResendOtpResponse>('/auth/send-otp')
    return response.data.message
}

export const getUser = async () => {
    const response = await apiClient.get<UserDataResponse>('/profile/user')
    return response.data.data
}

export const resetPassword = async (password: string) => {
    const response = await apiClient.patch('/auth/resetPassword', { password })
    return response.data.message
}

export const logout = async () => {
    const response = await apiClient.post<LogoutResponse>('/auth/logout')
    return response.data.message
}

/**
 * Redirects the browser to the backend Google OAuth authorization URL.
 * The backend will handle the full OAuth code exchange server-side.
 */
export const redirectToGoogleOAuth = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`
}

/**
 * Redirects the browser to the backend GitHub OAuth authorization URL.
 * The backend will handle the full OAuth code exchange server-side.
 */
export const redirectToGithubOAuth = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/github`
}