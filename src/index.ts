import { Kafka } from 'kafkajs';
import { TopicEnum } from './kafkaConnector'
import { MessageFromProducer, SubjectEnum } from './msTypes';
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

      switch (messageData.subject) {
        case SubjectEnum.newUser:
          await sendMail({ user: messageData.user, subject: messageData.subject })
        
        case SubjectEnum.newBet:
          await sendMail({ user: messageData.user, subject: messageData.subject, betsArray: messageData.betsArray})
          await Promise.all(
            messageData.arrayOfAdminUsers!.map(async admin => {
              await sendMail({ user: admin, subject: `Admin, new bets were placed!`, betsArray: messageData.betsArray })
          }))
        case SubjectEnum.newPassword:
          await sendMail({ user: messageData.user, subject: messageData.subject, token: messageData.token })
        
        case SubjectEnum.remindUserToBet:
          await sendMail({ user: messageData.user, subject: messageData.subject })
        
        default:
          break
      }
    },
  })
}
myMSConsumer()
