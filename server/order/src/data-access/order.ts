import dotenv from 'dotenv'
import Order from "../model/Order"
import { BadRequest } from "../errors"
import { IOrder } from "../interface/order"
import PublishMessage from '../utils/publisher'

dotenv.config()

export const _getOrderByOrderNo = async (order_no: number) => {
	try {
		const order = await Order.findOne({ order_no })
		return order
	} catch (error: any) {
		throw new BadRequest(error.message)
	}
}

export const _createOrder = async (payload: IOrder) => {
	try {
		await PublishMessage(payload)
		return
	} catch (error: any) {
		throw new BadRequest(error.message)
	}
}

export const _completeOrder = async (products: any[]) => {
	try {
		let orderProducts: any = []
		let totalPrice: number = 0
		for (let i = 0; i < products.length; i++) {
			const { _doc, quantity } = products[i]
			const order = {
				product_no: _doc.product_no,
				product_name: _doc.product_name,
				description: _doc.description,
				price: _doc.price,
				available: _doc.available,
				supplier: _doc.supplier,
				quantity
			}
			totalPrice +=  _doc.price * quantity
			orderProducts.push(order)
		}

		if (products[0]?.discount) {
			totalPrice = totalPrice - (totalPrice * products[0].discount) / 100
		}

		await Order.create({
			order_products: orderProducts,
			discount: products[0]?.discount || 0,
			total_order_price: totalPrice
		})

		await PublishMessage({ message: 'Order Created!' })

		return
	} catch (error: any) {
		throw new BadRequest(error.message)
	}
}
