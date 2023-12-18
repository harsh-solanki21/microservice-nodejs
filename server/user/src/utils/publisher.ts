import dotenv from 'dotenv'
import CreateChannel from '../config/rabbitmq'

dotenv.config()

const PublishMessage = async (message: any) => {
	const channel = await CreateChannel()
	
  // channel.publish(process.env.EXCHANGE_NAME as string, service, Buffer.from(message))
	channel.sendToQueue(
		process.env.USER_CHANNEL as string, 
		Buffer.from(
			JSON.stringify({ message })
		)
	)

  console.log('Sent: ', message)
}

export default PublishMessage
