import { Router } from "express"
import { registerUser, loginUser, logutUser } from "./auth.controller"

const router = Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logutUser)

export default router