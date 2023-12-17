import { Router } from 'express'
import { createUserValidations } from '../validations/UserValidations'
import { getUser, createUser } from '../controllers/UserController'

const router: Router = Router()

router.get('/get', [], getUser)

router.post('/create', [...createUserValidations], createUser)

export default router
