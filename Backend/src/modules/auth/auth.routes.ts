import { Router } from "express"
import {
    registerUser,
    loginUser,
    logutUser,
    resetPassword,
    verifyEmail,
    sendOTP,
    googleRedirect,
    googleCallback,
    githubRedirect,
    githubCallback,
} from "./auth.controller"
import { verifyUser } from "../../middlewares/authMiddleware"

const router = Router()

router.post('/register', registerUser)
router.post('/verify-email', verifyUser, verifyEmail)
router.post('/send-otp', verifyUser, sendOTP)
router.post('/login', loginUser)
router.post('/logout', logutUser)
router.patch('/resetPassword', verifyUser, resetPassword)

// OAuth — redirect-based (Authorization Code flow)
router.get('/google', googleRedirect)
router.get('/google/callback', googleCallback)
router.get('/github', githubRedirect)
router.get('/github/callback', githubCallback)

export default router