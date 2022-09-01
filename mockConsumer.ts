// CONSUMER

import { kafka, TopicEnum } from './kafkaConnector'
import nodemailer from 'nodemailer'


// sendMail(user,subject,template,token)

async function sendMail(user, subject, template, token) {
  //1-Info para envio de email
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.TRANSPORT_USER,
      pass: process.env.TRANSPORT_PASS
    }
  });
  //2-Enviar o email
  //Usar template engine { Handlebars, Pug, EJS, Edge, etc }
  const result = await transport.sendMail({
    from: "lottery_api@email.com", to: "user.email", subject: "subject.text", html: ""
    //await edge.render('recoverEmail', {user, token})
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
      const data = JSON.parse(message.value!.toString())
      
      console.log(sendMail(data.user, data.subject, data.template, data.token))
      if (data.subject === 'New bet') {
        sendMail(admin@email.com, 'New bet', 'newBet', data.token)
      }
    },
  })
}
myMSConsumer()
