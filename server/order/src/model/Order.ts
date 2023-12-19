import { Schema, Types, model } from 'mongoose'
import { IOrder } from '../interface/order'
import { BadRequest } from '../errors'

const OrderSchema: Schema = new Schema(
  {
    order_no: {
      type: Number,
    },
		order_products: [
			{
				product_no: {
					type: Number,
					required: [true, 'Product Number is Required']
				},
				product_name: {
					type: String,
					required: [true, 'Product Name is Required']
				},
				description: {
					type: String,
					required: [true, 'Product description is Required']
				},
				price: {
					type: Number,
					required: [true, 'Product Price is Required']
				},
				available: {
					type: Boolean,
					default: true
				},
				supplier: {
					type: Types.ObjectId,
					ref: 'User',
					required: [true, 'Supplier is Required']
				},
				quantity: {
					type: Number,
					required: [true, 'Product Quantity is Required']
				}
			}
		],
		status: {
			type: String,
			enums: ['CREATED', 'CONFIRMED', 'DELIVERED'],
			default: 'CREATED'
		},
		discount: {  // in percent
			type: Number,
			default: 0
		},
		order_date: {
			type: Date,
			default: Date.now()
		},
		total_order_price: {
			type: Number,
			required: [true, 'Total Order Price is Required']
		}
  },
  {
		timestamps: true
	}
)

OrderSchema.pre('save', async function (next) {
	try {
			if (this.isNew) {
					const lastOrderNo: any = await this.model('Order').findOne({}).sort({ createdAt: -1 })
					this.order_no = !lastOrderNo ? 1 : lastOrderNo.order_no + 1
			}
			next()
	} catch (error: any) {
			throw new BadRequest(error.message)
	}
})

export default model<IOrder>('Order', OrderSchema)
