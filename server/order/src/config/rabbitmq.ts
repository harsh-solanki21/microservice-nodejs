import amqplib from 'amqplib'
import dotenv from 'dotenv'
import { BadRequest } from "../errors";

dotenv.config()

const CreateChannel = async () => {
  try {
    const connection = await amqplib.connect(process.env.RABBITMQ_URL as string)
    const channel = await connection.createChannel()

    await channel.assertQueue(process.env.USER_CHANNEL as string)
    await channel.assertQueue(process.env.PRODUCT_CHANNEL as string)
    await channel.assertQueue(process.env.ORDER_CHANNEL as string)

    return channel
  } catch (error) {
    throw new BadRequest('RabbitMQ Connection Failed!')
  }
}

export default CreateChannel
