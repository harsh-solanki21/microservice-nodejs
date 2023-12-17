import { Schema } from 'mongoose'
import { IUser } from '../interface/user'

const UserSchema: Schema = new Schema(
  {
    user_no: {
      type: Number,
    },
    name: {
      type: String,
      required: [true, 'Name is Required'],
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill Valid Email',
      ],
      required: [true, 'Email is Required'],
    },
    password: {
      type: String,
      trim: true,
      minLength: [4, 'Password must be atleast 6 characters long'],
      required: [true, 'Password is Required'],
    },
  },
  {
    timestamp: true,
  }
)

UserSchema.index({ email: 1 }, { unique: true })

export default model<IUser>('users', UserSchema)
