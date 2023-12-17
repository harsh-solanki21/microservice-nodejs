import mongoose, { ConnectOptions } from 'mongoose'
import dotenv from 'dotenv'

const connectMongo = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI as string,
      { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions
    )
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
