import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as authRepository from './auth.repository'
import { RegisterUserInput, LoginUserInput } from './auth.types'
import { AppError } from '../../utils/appError'

export const register = async (data:RegisterUserInput) => {
    const existingUser = await authRepository.findUserByEmail(data.email)
    if(existingUser){
        throw new AppError(400, 'Email is already taken')
    }
    const hashedPassword = await bcrypt.hash(data.password, 10)

    const user = await authRepository.createUser({
        email: data.email,
        hashedPassword
    })

    const token = jwt.sign(
        {userId: user.id},
        process.env.JWT_SECRET!,
        {expiresIn: '7d'}
    )

    return {
        user: {id: user.id, email: user.email},
        token
    }
}

export const login = async(data: LoginUserInput) => {
    const user = await authRepository.findUserByEmail(data.email)
    if(!user){
        throw new AppError(401, 'Invalid email or password') 
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.hashedPassword)
    if(!isPasswordValid){
        throw new AppError(401, 'Invalid email or password') 
    }
    const token = jwt.sign(
        {userId: user.id},
        process.env.JWT_SECRET!,
        {expiresIn: '7d'}
    )
    return {
        user: {id: user.id, email: user.email},
        token
    }
}

