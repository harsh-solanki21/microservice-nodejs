import { Document, Types } from 'mongoose'

interface Products {
	product_no: number
	product_name: string
	description: string
	price: number
	available: boolean
	supplier: Types.ObjectId
	quantity: number
}

enum Status {
	CREATED = 'CREATED',
	CONFIRMED = 'CONFIRMED',
	DELIVERED = 'DELIVERED'
}

export interface IOrder extends Document {
  readonly _id: Types.ObjectId
  readonly order_no: number
  order_products: [Products]
	status: Status
	discount: number
	order_date: Date
	total_order_price: number
}
