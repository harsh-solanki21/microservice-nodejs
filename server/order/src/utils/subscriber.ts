import dotenv from 'dotenv'
import CreateChannel from '../config/rabbitmq'
import { _completeOrder } from '../data-access/order'

dotenv.config()

const SubscribeMessage = async () => {
	const channel = await CreateChannel()

  channel.consume(
		process.env.ORDER_QUEUE as string,
		async (message: any) => {
			if (message.content) {
				const products = JSON.parse(message.content.toString())
				await _completeOrder(products)
			}
			console.log('[X] received')
		},
		{
			noAck: true,
		}
	)
}

export default SubscribeMessage
