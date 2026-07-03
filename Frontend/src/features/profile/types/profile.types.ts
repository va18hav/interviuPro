export interface CreateProfileInput {
    firstName: string,
    lastName: string,
    skills: string[]
}

export interface UpdateProfileInput {
    firstName?: string,
    lastName?: string,
    skills?: string[]
}

export interface CreateProfileResponse {
    success: boolean
    message: string
    data: {
        firstName: string
        lastName: string
        credits: number
        skills: string[]
    } | undefined
}

export interface UpdateProfileResponse {
    success: boolean
    message: string
    data: {
        firstName?: string
        lastName?: string
        credits?: string
        skills?: string[]
    } | undefined
}

export interface GetProfileData {
    email: string
    onboarding_step1: boolean
    onboarding_step2: boolean
    profiles: {
        firstName: string
        lastName: string
        skills: string[]
        credits: number
        updatedAt: string
    } | null
    resume: {
        resumeUrl: string
    }
}

export interface GetProfileDataResponse {
    success: boolean
    message: string
    data: GetProfileData
}
