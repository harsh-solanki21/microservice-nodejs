import amqplib from 'amqplib'
import dotenv from 'dotenv'
import { BadRequest } from "../errors";

dotenv.config()

const CreateChannel = async () => {
  try {
    const connection = await amqplib.connect(process.env.RABBITMQ_URL as string)
    const channel = await connection.createChannel()

		const exchange: string = process.env.EXCHANGE_NAME as string
		const userQueue: string = process.env.USER_QUEUE as string
		const productQueue: string = process.env.PRODUCT_QUEUE as string
		const orderQueue: string = process.env.ORDER_QUEUE as string

    await channel.assertExchange(exchange, 'fanout', { durable: false })

		await channel.assertQueue(userQueue, { durable: false })
		await channel.assertQueue(productQueue, { durable: false })
		await channel.assertQueue(orderQueue, { durable: false })

		await channel.bindQueue(userQueue, exchange, '')
		await channel.bindQueue(productQueue, exchange, '')
		await channel.bindQueue(orderQueue, exchange, '')

    return channel
  } catch (error) {
    throw new BadRequest('RabbitMQ Connection Failed!')
  }
}

export default CreateChannel
