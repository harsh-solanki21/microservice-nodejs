import { Router } from 'express'
import { createOrderValidations } from '../validations/OrderValidations'
import { getOrder, createOrder } from '../controllers/OrderController'

const router: Router = Router()

router.get('/get/:order_no', [], getOrder)

router.post('/create', [...createOrderValidations], createOrder)

export default router
