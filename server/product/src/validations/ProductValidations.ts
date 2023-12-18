import { body } from 'express-validator'

export const createProductValidations = [
  body('product_name').trim().notEmpty().withMessage('Product name is Required'),
  body('description').trim().notEmpty().withMessage('Product Description is Required'),
  body('price').isNumeric().withMessage('Price is Required'),
  body('available').optional().isBoolean(),
  body('supplier').isMongoId().withMessage('Product Supplier is Required'),
]
