import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import crypto from 'crypto'
import { AppError } from './appError'

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export const uploadFileToS3 = async (fileBuffer: Buffer, mimetype: string):
  Promise<{ resumeKey: string, resumeUrl: string }> => {
  const fileName = `resume/${crypto.randomUUID()}.pdf`
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileName,
    Body: fileBuffer,
    ContentType: mimetype
  })

  try {
    await s3Client.send(command)
  } catch (error) {
    console.error("S3 Upload Failed:", error)
    throw new AppError(500, "Failed to upload file to S3 storage")
  }

  const resumeUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`

  return {
    resumeKey: fileName,
    resumeUrl
  }
}

export const deleteFileinS3 = async (key: string) => {
  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key
  })
  try {
    await s3Client.send(command)
  } catch (error) {
    console.error("S3 Delete Failed:", error)
    throw new AppError(500, "Failed to delete file from S3 storage")
  }
}
