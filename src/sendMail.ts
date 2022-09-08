import { getTemplate } from "./htmlTemplateStrings";
import { MessageFromProducer } from "./msTypes";
import nodemailer from 'nodemailer'

export async function sendMail({ user, subject, token, betsArray, arrayOfAdminUsers }: MessageFromProducer) {
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
    html: getTemplate(subject, user, token, betsArray, arrayOfAdminUsers)
  })
  console.log('message sent',result.messageId)
  return 'Message sent'
}