import {Router} from 'express'
const router = Router()
import {register, login} from '../controllers/authController.js'

//register router
router.post('/register', register)

//login router
router.post('/login', login)

export default router