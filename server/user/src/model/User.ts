import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
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
		timestamps: true
	}
)

UserSchema.index({ email: 1 }, { unique: true })

UserSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password') && user.password) {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
    }
    next()
})

UserSchema.methods.matchPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password)
}

export default model<IUser>('User', UserSchema)
