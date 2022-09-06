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
    eachMessage: async ({ topic, partition, message }) => {
      const messageData: MessageFromProducer = JSON.parse(message.value!.toString())
      if (messageData.subject === SubjectEnum.newBet) {
        const admin: User = {
          name: 'Admin', 
          email: 'admin@email.com', 
          cpf: '111.222.333-00', 
          id: 1, 
          password: 'secret', 
          secureId: 'random', 
          createdAt: Date.now().toString(), 
          updatedAt: Date.now().toString()
        }
        await sendMail({user: admin, subject: SubjectEnum.newBet, betsArray: messageData.betsArray})
      }
    },
  })
}
myMSConsumer()
