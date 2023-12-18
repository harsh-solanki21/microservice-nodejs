import { Router } from 'express'
import { createOrderValidations } from '../validations/UserValidations'
import { getOrder, createOrder } from '../controllers/OrderController'

const router: Router = Router()

router.get('/get/:order_no', [], getOrder)

router.post('/create', [...createOrderValidations], createOrder)

export default router
