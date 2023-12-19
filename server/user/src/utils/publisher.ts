import dotenv from 'dotenv'
import CreateChannel from '../config/rabbitmq'

dotenv.config()

const PublishMessage = async (message: any) => {
	const channel = await CreateChannel()

	// channel.sendToQueue(process.env.USER_QUEUE as string , Buffer.from(JSON.stringify(message)), { persistent: false })

  console.log('Sent: ', message)
}

export default PublishMessage
