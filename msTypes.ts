enum SubjectEnum {
  newBet = 'new bet' ,
  newUser = 'new user',
  newPassword = 'new password'
}

type Bet = {
  game: string,
  numbers: string
}

type User = {
  id: number
  secureId: string
  name: string
  cpf: string
  email: string
  password: string
  createdAt: string
  updatedAt: string
}

type MessageFromProducer = {
  user: User, 
  subject: string, 
  token?: string, 
  betsArray?: Bet[]
}
export { Bet, MessageFromProducer, SubjectEnum, User}