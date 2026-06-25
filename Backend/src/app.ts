import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './modules/auth/auth.routes'
import profileRoutes from './modules/profile/profile.routes'
import interviewRoutes from './modules/interview/interview.routes'
import { errorHandler } from './middlewares/errorHandler'

dotenv.config()

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)
app.use('/interview', interviewRoutes)

app.use(errorHandler)

export default app