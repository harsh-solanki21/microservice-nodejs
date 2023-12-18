import { Request, Response } from 'express'
import { throwValidationErrors } from '../utils/throwValidationError'
import { _getOrderByOrderNo, _createOrder } from '../data-access/order'
import { NotFound } from '../errors'
import PublishMessage from '../utils/publisher'

export const getOrder = async (req: Request, res: Response) => {
	throwValidationErrors(req)
	const { order_no } = req.params

	const order = await _getOrderByOrderNo(Number(order_no))
	if (!order) {
		throw new NotFound('Order Not Found')
	}

	await PublishMessage(order)

	res.status(200).json(order)
}

export const createOrder = async (req: Request, res: Response) => {
	throwValidationErrors(req)
	
	await _createOrder(req.body)
	await PublishMessage({ message: 'Order Created!' })

	res.status(200).json({ message: 'Order Created!' })
}
