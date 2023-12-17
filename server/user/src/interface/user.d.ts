import { Document, Types } from 'mongoose'

export interface IUser extends Document {
  readonly _id: Types.ObjectId
  readonly user_no: number
  name: string
  email: string
  password: string
}
