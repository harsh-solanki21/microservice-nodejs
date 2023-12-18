import { Document, Types } from 'mongoose'

export interface IProduct extends Document {
  readonly _id: Types.ObjectId
  readonly product_no: number
  product_name: string
  description: string
  price: number
	available: boolean
	supplier: Types.ObjectId
}
