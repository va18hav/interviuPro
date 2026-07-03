import { Router } from "express"
import { registerUser, loginUser, logutUser, resetPassword, verifyEmail, sendOTP } from "./auth.controller"
import { verifyUser } from "../../middlewares/authMiddleware"

const router = Router()

router.post('/register', registerUser)
router.post('/verify-email', verifyUser, verifyEmail)
router.post('/send-otp', verifyUser, sendOTP)
router.post('/login', loginUser)
router.post('/logout', logutUser)
router.patch('/resetPassword', verifyUser, resetPassword)

export default router