// PRODUCER

import { kafka, TopicEnum } from './kafkaConnector'
import nodemailer from 'nodemailer'

const myMSProducer = async () => {
  const producer = kafka.producer()

  await producer.connect()
  console.log('Producer connected')
  const topic = TopicEnum.emails
  await producer.send({
    topic,
    messages: [
      { value: JSON.stringify({}) },
    ],
  })
  await producer.disconnect()

  console.log('Message sent')
}

myMSProducer()