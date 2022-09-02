import { kafka, TopicEnum } from './kafkaConnector'
import { User, SubjectEnum, MessageFromProducer } from './msTypes'
import { sendMail } from './sendMail'

const myMSMockConsumer = async () => {
  const consumer = kafka.consumer({ groupId: 'ms-group' })
  await consumer.connect()
  await consumer.subscribe({ topic: TopicEnum.emails, fromBeginning: true })
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
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
myMSMockConsumer()