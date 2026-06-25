import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3'
import crypto from 'crypto'

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export const uploadFileToS3 = async (fileBuffer: Buffer, mimetype: string):
Promise<string> => {
 const fileName = `resume/${crypto.randomUUID()}.pdf`
 const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileName,
    Body: fileBuffer,
    ContentType: mimetype
 })

 await s3Client.send(command)
 
 return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`
}
