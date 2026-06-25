import {z} from 'zod'

export const registerUserSchema = z.object({
    email: z.string().email('Please Provide a valid email address'),
    password: z.string().min(8, 'Password must be atleast 8 characters')
})

export const loginUserSchema = registerUserSchema

export type RegisterUserInput = z.infer<typeof registerUserSchema>

export type LoginUserInput = RegisterUserInput