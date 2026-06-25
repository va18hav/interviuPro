import { AppError } from '../../utils/appError'
import { extractTextFromPDF } from '../../utils/pdf'
import { uploadFileToS3 } from '../../utils/s3'
import * as profileRepository from './profile.repository'
import { CreateProfileInput, ProfileOutput } from './profile.types'

export const create = async (data: CreateProfileInput) => {
    const isUserValid = await profileRepository.findUserById(data.userId)
    if (!isUserValid) {
        throw new AppError(404, 'User not found')
    }
    const profile = await profileRepository.createProfile(data)
    await profileRepository.onboardingCompleted(data.userId)
    return {
        profile: {
            firstName: profile.firstName,
            lastName: profile.lastName,
            credits: profile.credits,
            skills: profile.skills
        }
    }
}

export const uploadResume = async (fileBuffer: Buffer, mimetype: string, userId: string) => {
    const isUserValid = await profileRepository.findUserById(userId)
    if (!isUserValid) {
        throw new AppError(404, 'User not found')
    }
    const [resumeUrl, resumeText] = await Promise.all([
        uploadFileToS3(fileBuffer, mimetype),
        extractTextFromPDF(fileBuffer)
    ])
    const updatedProfile = await profileRepository.uploadResumeDB(userId, resumeUrl, resumeText)
    return {
        updatedProfile: {
            firstName: updatedProfile.firstName,
            lastName: updatedProfile.lastName,
            resumeUrl: updatedProfile.resumeUrl,
            resumeText: updatedProfile.resumeText
        }
    }
}

export const getUser = async (userId: string) => {
    const user = await profileRepository.findUserById(userId)
    if (!user) {
        throw new AppError(404, 'User Not Found')
    }
    return {
        user: {
            email: user.email,
            createdAt: user.createdAt
        }
    }
}

export const getUserProfile = async (userId: string) => {
    const profile = await profileRepository.findUserProfile(userId)
    return profile
}