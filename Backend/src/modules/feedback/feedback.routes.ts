import { Router } from "express";
import { verifyUser } from "../../middlewares/authMiddleware";
import { generateFeedback } from "./feedback.controller";

const router = Router()

router.post('/:sessionId', generateFeedback)

export default router