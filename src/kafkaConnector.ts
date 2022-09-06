import { Kafka } from "kafkajs"

const kafka = new Kafka({
  clientId: 'lottery-api',
  brokers: ['kafka:9091'],
})

enum TopicEnum {
  emails = 'lottery-api-emails',
}

export { kafka, TopicEnum }