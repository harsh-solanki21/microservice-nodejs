import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { BadRequest } from '../errors'

dotenv.config()

mongoose.set('strictQuery', false)

const ConnectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string)
		console.log('Connected to MongoDB')
  } catch (error) {
		throw new BadRequest('MongoDB Connection Failed!')

  }
}

export default ConnectMongo