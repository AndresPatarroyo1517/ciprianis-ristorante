import Router from 'express'
import { AuthController } from '../controller/auth.js'
import { authRateLimiter } from '../middlewares/middlewares.js'

const router = Router()

router.post('/signup', AuthController.signup)
router.post('/login', authRateLimiter, AuthController.login)
router.post('/logout', AuthController.logout)

export default router
