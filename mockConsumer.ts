import { kafka, TopicEnum } from './kafkaConnector'
import nodemailer from 'nodemailer'
import { getTemplate } from './htmlTemplateStrings'
import { User, SubjectEnum, MessageFromProducer } from './msTypes'
import 'dotenv/config'

async function sendMail({ user, subject, token, betsArray }: MessageFromProducer) {
  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });
  const result = await transport.sendMail({
    from: "lottery_api@email.com", 
    to: user.email, 
    subject: subject, 
    html: getTemplate(subject, user, token, betsArray)
  })
  console.log('message sent',result.messageId)
  return 'Message sent'
}

const myMSConsumer = async () => {
  const consumer = kafka.consumer({ groupId: 'ms-group' })
  await consumer.connect()
  await consumer.subscribe({ topic: TopicEnum.emails, fromBeginning: true })
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      // Get the message from the producer
      const data: MessageFromProducer = JSON.parse(message.value!.toString())
      if (data.subject === SubjectEnum.newBet) {
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
        await sendMail({user: admin, subject: SubjectEnum.newBet, betsArray: data.betsArray})
      }
    },
  })
}
myMSConsumer()