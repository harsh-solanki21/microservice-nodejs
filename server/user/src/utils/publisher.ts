import dotenv from 'dotenv'
import CreateChannel from '../config/rabbitmq'

dotenv.config()

const PublishMessage = async (service: string, message: string) => {
	const channel = await CreateChannel()
	
  channel.publish(process.env.EXCHANGE_NAME as string, service, Buffer.from(message))
  console.log('Sent: ', message)
}

export default PublishMessage
