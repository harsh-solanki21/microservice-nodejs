import dotenv from 'dotenv'
import CreateChannel from '../config/rabbitmq'

dotenv.config()

const PublishMessage = async (queue: string = process.env.USER_QUEUE as string, message: any) => {
	const channel = await CreateChannel()
	
  channel.sendToQueue(queue , Buffer.from(JSON.stringify(message)), { persistent: false })

  console.log('Sent: ', message)
}

export default PublishMessage
