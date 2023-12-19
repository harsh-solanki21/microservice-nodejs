import dotenv from 'dotenv'
import CreateChannel from '../config/rabbitmq'

dotenv.config()

const SubscribeMessage = async () => {
	const channel = await CreateChannel()

  channel.consume(
		process.env.USER_QUEUE as string,
		async (message: any) => {
			if (message.content) {
				const msg = JSON.parse(message.content.toString())
				console.log('Received: ', msg)
			}
			console.log('[X] received')
		},
		{
			noAck: true,
		}
	)

}

export default SubscribeMessage
