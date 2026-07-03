import { Router } from "express";
import { verifyUser } from "../../middlewares/authMiddleware";
import { getDashboardData } from "./dashboard.controller";

const router = Router()

router.get('/get', getDashboardData)

export default router