import { Router } from "express";
import { verifyUser } from "../../middlewares/authMiddleware";
import { createInterview, fetchInterview, startInterview } from './interview.controller'

const router = Router()

router.post('/create', verifyUser, createInterview)
router.post('/start/:interviewId', verifyUser, startInterview)
router.get('/get', fetchInterview)

export default router