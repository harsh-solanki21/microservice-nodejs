import dotenv from 'dotenv'
import Order from "../model/Order"
import { BadRequest } from "../errors"
import { IOrder } from "../interface/order"
import SubscribeMessage from "../utils/subscriber"

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
		const { order_products, discount } = payload
		let totalPrice: number = 0

		for (let i = 0; i < order_products.length; i++) {
			const product: any = await SubscribeMessage(process.env.PRODUCT_CHANNEL as string)
			totalPrice += product.price * order_products[i].quantity
		}

		if (discount) {
			totalPrice = totalPrice - (totalPrice * discount) / 100
		}

		const order = await Order.create({
			order_products,
			discount,
			total_order_price: totalPrice
		})

		return order
	} catch (error: any) {
		throw new BadRequest(error.message)
	}
}
