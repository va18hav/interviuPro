import { AppError } from "../../utils/appError";
import { findUserById, getResume } from "../../utils/dbservices";
import { extractTextFromPDF } from "../../utils/pdf";
import { deleteFileinS3, uploadFileToS3 } from "../../utils/s3";
import * as resumeRepository from './resume.repository'

export const uploadResume = async (fileBuffer: Buffer, mimetype: string, userId: string) => {
    const isUserValid = await findUserById(userId)
    if (!isUserValid) {
        throw new AppError(404, 'User not found')
    }
    const [{ resumeUrl, resumeKey }, resumeText] = await Promise.all([
        uploadFileToS3(fileBuffer, mimetype),
        extractTextFromPDF(fileBuffer)
    ])
    const resume = await resumeRepository.uploadResumeDB(userId, resumeUrl, resumeKey, resumeText)
    await resumeRepository.onboardingStep2(userId)
    return resume
}

export const updateResume = async (fileBuffer: Buffer, mimeType: string, userId: string) => {
    const isUserValid = await findUserById(userId)
    if (!isUserValid) throw new AppError(404, 'User not found')
    const resume = await getResume(userId)
    if (!resume) throw new AppError(400, 'Resume not found')
    const key = resume.resumeKey
    const [{ resumeUrl, resumeKey }, resumeText] = await Promise.all([
        uploadFileToS3(fileBuffer, mimeType),
        extractTextFromPDF(fileBuffer)
    ])
    const updatedResume = await resumeRepository.updateResume(userId, resumeUrl, resumeKey, resumeText)
    await deleteFileinS3(key)
    return updatedResume
}