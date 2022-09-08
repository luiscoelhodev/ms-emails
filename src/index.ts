import { Kafka } from 'kafkajs';
import { TopicEnum } from './kafkaConnector'
import { MessageFromProducer, SubjectEnum, User } from './msTypes';
import { sendMail } from './sendMail';
import 'dotenv/config'

const kafka = new Kafka({
  clientId: 'kafka',
  brokers: ['kafka:9091'],
})

const myMSConsumer = async () => {
  const consumer = kafka.consumer({ groupId: 'ms-group' })

  await consumer.connect()
  console.log('consumer connected successfully')
  await consumer.subscribe({ topic: TopicEnum.emails, fromBeginning: true })
  
  await consumer.run({
    eachMessage: async ({ message }) => {
      const messageData: MessageFromProducer = JSON.parse(message.value!.toString())
      console.log(messageData)
      if (messageData.subject === SubjectEnum.newBet) {
        //await sendMail({user: admin, subject: SubjectEnum.newBet, betsArray: messageData.betsArray})
      }
    },
  })
}
myMSConsumer()
