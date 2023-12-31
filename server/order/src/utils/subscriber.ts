import dotenv from 'dotenv'
import CreateChannel from '../config/rabbitmq'

dotenv.config()

const SubscribeMessage = async (subscribed_channel: string) => {
	const channel = await CreateChannel()

  // await channel.assertExchange(process.env.EXCHANGE_NAME as string, 'direct', { durable: true })
  // const q = await channel.assertQueue('', { exclusive: true })
  // console.log(`Waiting for messages in queue: ${q.queue}`)

  // channel.bindQueue(q.queue, process.env.EXCHANGE_NAME as string, CUSTOMER_SERVICE)

  // channel.consume(
  //   q.queue,
  //   (message: any) => {
  //     if (message.content) {
  //       console.log('The message is: ', message.content.toString())
  //       service.SubscribeEvents(message.content.toString())
  //     }
  //     console.log('[X] received')
  //   },
  //   {
  //     noAck: true,
  //   }
  // )

	await channel.consume (
		subscribed_channel,
		(message: any) => {
			console.log(`Received message: ${JSON.parse(message.content.toString())}`)
		},
		{
			noAck: true,
		}
	)
}

export default SubscribeMessage
