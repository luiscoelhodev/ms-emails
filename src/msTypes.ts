import { DateTime } from "luxon"

enum SubjectEnum {
  newBet = 'A new bet was created!',
  newUser = 'Welcome to the Lottery API!',
  newPassword = "Here's your reset passwork token.",
  remindUserToBe = "Long time no see!"
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
  createdAt: DateTime
  updatedAt: DateTime
}

type MessageFromProducer = {
  user: User, 
  subject: string, 
  token?: string, 
  betsArray?: Bet[],
  arrayOfAdminUsers?: User[]
}
export { Bet, MessageFromProducer, SubjectEnum, User}