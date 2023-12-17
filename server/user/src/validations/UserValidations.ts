import { body } from 'express-validator'

export const createUserValidations = [
  body('name').trim().notEmpty().withMessage('Name is Required'),
  body('email').trim().notEmpty().withMessage('Email is Required'),
  body('password').trim().notEmpty().isLength({ min: 4 }).withMessage('Password must be at least 4 characters long'),
]
