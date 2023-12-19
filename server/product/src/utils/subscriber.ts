import dotenv from 'dotenv'
import CreateChannel from '../config/rabbitmq'
import PublishMessage from './publisher'
import { _getProductsById } from '../data-access/product'

dotenv.config()

const SubscribeMessage = async () => {
	const channel = await CreateChannel()

  channel.consume(
    process.env.PRODUCT_QUEUE as string,
    async (message: any) => {
      if (message.content) {
        const data = JSON.parse(message.content.toString())
				if (!data.message) {
					const products = await _getProductsById(data)
					PublishMessage(process.env.ORDER_QUEUE, products)
				}
      }
      console.log('[X] received')
    },
    {
      noAck: true,
    }
	)
}

export default SubscribeMessage
