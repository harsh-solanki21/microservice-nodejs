import { body } from 'express-validator'

export const createOrderValidations = [
  body('order_products.*.product_id').isMongoId().withMessage('Product ID is Required'),
  body('order_products.*.quantity').isNumeric().withMessage('Product Quantity is Required'),
  body('discount').optional().isNumeric(),
]
