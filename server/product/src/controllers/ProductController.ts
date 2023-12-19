import { Request, Response } from 'express'
import { throwValidationErrors } from '../utils/throwValidationError'
import { _getProductByProductNo, _createProduct } from '../data-access/product'
import { NotFound } from '../errors'
import PublishMessage from '../utils/publisher'

export const getProduct = async (req: Request, res: Response) => {
	throwValidationErrors(req)
	const { product_no } = req.params

	const product = await _getProductByProductNo(Number(product_no))
	if (!product) {
		throw new NotFound('Product Not Found')
	}

	await PublishMessage(undefined, product)

	res.status(200).json(product)
}

export const createProduct = async (req: Request, res: Response) => {
	throwValidationErrors(req)
	
	await _createProduct(req.body)
	await PublishMessage(undefined, { message: 'Product Created!' })

	res.status(200).json({ message: 'Product Created!' })
}
