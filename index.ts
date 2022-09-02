import express from 'express'
import { Kafka } from 'kafkajs'
import { MessageFromProducer, SubjectEnum, User } from './msTypes';
import { sendMail } from './sendMail';
import 'dotenv/config'
const server = express()
const port = 3000

server.use(express.json());
server.get('/', (_req, res) => {
  return res.send({ hello: `world` })
})
server.listen(port, () => {
  console.log('Server is listening on port 3000')
})

const kafka = new Kafka({
  clientId: 'lottery-api',
  brokers: ['localhost:9092'],
})

const myMSConsumer = async () => {
  const consumer = kafka.consumer({ groupId: 'ms-group' })

  await consumer.connect()
  await consumer.subscribe({ topic: 'lottery-api-emails', fromBeginning: true })
  
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
