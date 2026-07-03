import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './modules/auth/auth.routes'
import profileRoutes from './modules/profile/profile.routes'
import resumeRoutes from './modules/resume/resume.routes'
import interviewRoutes from './modules/interview/interview.routes'
import sessionRoutes from './modules/session/session.routes'
import feedbackRoutes from './modules/feedback/feedback.routes'
import dashboardRoutes from './modules/dashboard/dashboard.routes'
import { errorHandler } from './middlewares/errorHandler'

import { verifyUser, requireEmailVerified } from './middlewares/authMiddleware'

dotenv.config()

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use('/auth', authRoutes)

// Protect all resource routes with authentication and email verification
app.use('/profile', verifyUser, profileRoutes)
app.use('/resume', verifyUser, requireEmailVerified, resumeRoutes)
app.use('/interview', verifyUser, requireEmailVerified, interviewRoutes)
app.use('/session', verifyUser, requireEmailVerified, sessionRoutes)
app.use('/feedback', verifyUser, requireEmailVerified, feedbackRoutes)
app.use('/dashboard', verifyUser, requireEmailVerified, dashboardRoutes)

app.use(errorHandler)

export default app