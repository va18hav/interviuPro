import { prisma } from '../../lib/prisma'

export const findUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: {email}
    })
}

export const createUser = async (data: {email: string, hashedPassword: string}) => {
    return await prisma.user.create({
        data:{
            email: data.email,
            hashedPassword: data.hashedPassword
        }
    })
}