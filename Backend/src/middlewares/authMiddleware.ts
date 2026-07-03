import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { AppError } from '../utils/appError'

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token
  if (!token) {
    throw new AppError(401, 'Session Expired')
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string, isEmailVerified: boolean }
  req.userId = decoded.userId
  req.isEmailVerified = decoded.isEmailVerified
  next()
}

export const requireEmailVerified = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.isEmailVerified) {
    throw new AppError(403, 'Email is not verified')
  }
  next()
}