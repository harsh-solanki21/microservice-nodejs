import { body } from 'express-validator'

export const createOrderValidations = [
  body('quantity').isNumeric().withMessage('Product Quantity is Required'),
  body('discount').optional().isNumeric(),
]
