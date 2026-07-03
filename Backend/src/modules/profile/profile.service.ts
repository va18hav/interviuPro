import { AppError } from '../../utils/appError'
import { getResume } from '../../utils/dbservices'
import { extractTextFromPDF } from '../../utils/pdf'
import { deleteFileinS3, uploadFileToS3 } from '../../utils/s3'
import * as profileRepository from './profile.repository'
import { CreateProfileInput, ProfileOutput, UpdateProfileInput } from './profile.types'

export const create = async (data: CreateProfileInput) => {
    const isUserValid = await profileRepository.findUserById(data.userId)
    if (!isUserValid) {
        throw new AppError(404, 'User not found')
    }
    if (!data.firstName || !data.lastName || !data.skills) throw new AppError(400, 'All the fields are required')
    const profile = await profileRepository.createProfile(data)
    await profileRepository.onboardingStep1(data.userId)
    return profile
}

export const update = async (userId: string, data: UpdateProfileInput) => {
    const isUserValid = await profileRepository.findUserById(userId)
    if (!isUserValid) {
        throw new AppError(404, 'User not found')
    }
    const profile = await profileRepository.updateProfile(userId, data)
    return profile
}

export const getUser = async (userId: string) => {
    const user = await profileRepository.findUserById(userId)
    if (!user) {
        throw new AppError(404, 'User Not Found')
    }
    return user
}

export const getUserProfile = async (userId: string) => {
    const profile = await profileRepository.findUserProfile(userId)
    return profile
}