import { z } from 'zod'

export const createProfileSchema = z.object({
    userId: z.string(),
    firstName: z.string(),
    lastName: z.string().optional(),
    skills: z.array(z.string()).optional(),
})

export type CreateProfileInput = z.infer<typeof createProfileSchema>

export interface ProfileOutput {
    firstName: string,
    lastName: string,
    skills: string[],
    resumeUrl: string,
    resumeText: string,
    credits: number
}