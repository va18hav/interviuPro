import { Router } from "express"
import { createProfile, uploadResume, getUser, getUserProfile } from "./profile.controller"
import { verifyUser } from "../../middlewares/authMiddleware"
import multer from "multer"

const router = Router()
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {fileSize: 5 * 1024 * 1024},
    fileFilter: (req, file, cb) => {
        if(file.mimetype === 'application/pdf') {
            cb(null, true)
        }
        else{
            cb(new Error('Only PDF files are allowed'))
        }
    }
})

router.post('/create', verifyUser, createProfile)
router.post('/resume', verifyUser, upload.single('resume'), uploadResume )
router.get('/user', verifyUser, getUser )
router.get('/getProfile', verifyUser, getUserProfile)


export default router