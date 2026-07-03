import { Router } from "express";
import { verifyUser } from "../../middlewares/authMiddleware";
import { startInterview, getAllSessions, getSession, getTranscript } from "./session.controller";

const router = Router()

router.post('/start/:interviewId', startInterview)
router.get('/get-all', getAllSessions)
router.get('/:sessionId', getSession)
router.get('/transcript/:sessionId', getTranscript)

export default router