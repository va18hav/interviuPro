import { Router } from "express"
import { createProfile, updateProfile, getUser, getUserProfile } from "./profile.controller"
import { verifyUser, requireEmailVerified } from "../../middlewares/authMiddleware"
import multer from "multer"

const router = Router()

router.post('/', verifyUser, requireEmailVerified, createProfile)
router.patch('/', verifyUser, requireEmailVerified, updateProfile)
router.get('/user', verifyUser, getUser)
router.get('/getProfile', verifyUser, requireEmailVerified, getUserProfile)


export default router