// import { kafka, TopicEnum } from '../src/kafkaConnector'
// import { MessageFromProducer, SubjectEnum, User } from '../src/msTypes'

// const myUser: User = {
// 	id: 4,
// 	secureId: "3f1514bb-6edf-4071-be54-5cf03bd8e8c2",
// 	name: "Luis Coelho",
// 	cpf: "111.222.333-02",
// 	email: "luis@email.com",
//   password: '123456',
// 	createdAt: "2022-08-31T16:21:05.000-03:00",
// 	updatedAt: "2022-08-31T16:21:05.000-03:00"
// }

// const newUser: MessageFromProducer = {
//   user: myUser,
//   subject: SubjectEnum.newUser
// }

// const newPassword: MessageFromProducer = {
//   user: myUser,
//   subject: SubjectEnum.newPassword,
//   token: 'yournewtokentoresetpassword'
// }

// const betsObject: MessageFromProducer = {
//   user: myUser,
//   subject: SubjectEnum.newBet,
//   betsArray: [
//     {
//       game: 'Mega-Sena',
//       numbers: '1, 5, 8, 25, 36, 55'
//     },
//     {
//       game: 'Quina',
//       numbers: '10, 20, 30, 40, 50'
//     },
//     {
//       game: 'Quina',
//       numbers: '40, 50, 60, 70, 80'
//     }
//   ]
// }

// const myMSMockProducer = async () => {
//   const producer = kafka.producer()

//   await producer.connect()
//   console.log('Producer connected')
//   const topic = TopicEnum.emails
//   await producer.send({
//     topic,
//     messages: [
//       { value: JSON.stringify(betsObject) },
//       { value: JSON.stringify(newUser) },
//       { value: JSON.stringify(newPassword) }
//     ],
//   })
//   await producer.disconnect()

//   console.log('Message sent')
// }

// myMSMockProducer()