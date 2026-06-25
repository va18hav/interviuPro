import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { AppError } from '../utils/appError'

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token
  if(!token){
    throw new AppError (401, 'Session Expired')
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {userId: string}
  req.userId = decoded.userId
  next()
}