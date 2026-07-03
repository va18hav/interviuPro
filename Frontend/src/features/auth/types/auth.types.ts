export type AuthInput = {
    email: string,
    password: string
}

export type AuthResponse = {
    id: string
    email: string
}

export interface AuthResponseAPI {
    success: boolean
    message: string
    data: AuthResponse | undefined
}

export interface LogoutResponse {
    success: boolean
    message: string
}

export interface VerifyEmailResponse {
    success: boolean
    message: string
    data: {
        id: string
        email: string
        isEmailVerified: true
    } | undefined
}

export interface ResendOtpResponse {
    success: boolean
    message: string
}

export interface UserDataResponse {
    success: boolean
    message: string
    data: {
        email: string
        isEmailVerified: true
    } | undefined
}
