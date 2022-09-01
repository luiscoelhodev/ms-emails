import express from 'express'
import { Kafka } from 'kafkajs'
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
      console.log({
        value: message.value!.toString(),
      })
    },
  })
}
myMSConsumer()
