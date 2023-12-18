import { Schema, Types, model } from 'mongoose'
import { IProduct } from '../interface/product'
import { BadRequest } from '../errors'

const ProductSchema: Schema = new Schema(
  {
    product_no: {
      type: Number,
    },
    product_name: {
      type: String,
			unique: true,
      required: [true, 'Product name is Required'],
      trim: true,
    },
		description: {
			type: String,
			required: [true, 'Product Description is Required'],
		},
		price: {
			type: Number,
			required: [true, 'Price is Required'],
		},
		available: {
			type: Boolean,
			default: true
		},
		supplier: {
			type: Types.ObjectId,
			ref: 'User',
			required: [true, 'Product Supplier is Required'],
		}
  },
  {
		timestamps: true
	}
)

ProductSchema.pre('save', async function (next) {
	try {
			if (this.isNew) {
					const lastProductNo: any = await this.model('Product').findOne({}).sort({ createdAt: -1 })
					this.product_no = !lastProductNo ? 1 : lastProductNo.product_no + 1
			}
			next()
	} catch (error: any) {
			throw new BadRequest(error.message)
	}
})

export default model<IProduct>('Product', ProductSchema)
