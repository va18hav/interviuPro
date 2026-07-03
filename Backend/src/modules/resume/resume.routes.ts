import { Router } from "express";
import { verifyUser } from "../../middlewares/authMiddleware";
import { updateResume, uploadResume } from "./resume.controller";
import multer from "multer";

const router = Router()

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true)
        }
        else {
            cb(new Error('Only PDF files are allowed'))
        }
    }
})

router.post('/', upload.single('resume'), uploadResume)
router.patch('/', upload.single('resume'), updateResume)

export default router