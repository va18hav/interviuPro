import { Router } from "express";
import { verifyUser } from "../../middlewares/authMiddleware";
import { createInterview, fetchInterview, fetchAllInterviews, fetchInterviewSessions } from './interview.controller'

const router = Router()

router.post('/create', createInterview)
router.get('/get/:interviewId', fetchInterview)
router.get('/all-interviews', fetchAllInterviews)
router.get('/all-sessions/:interviewId', fetchInterviewSessions)

export default router