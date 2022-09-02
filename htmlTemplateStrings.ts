import { Bet, SubjectEnum, User } from "./msTypes"

export function getTemplate(subject: string, user: User, token?: string, betsArray?: Bet[]) {
  if (user.email !== 'admin@email.com'){
    switch (subject) {
      case SubjectEnum.newUser:
        return `<h1>Welcome to the Lottery API, ${user.name}!</h1>`
      case SubjectEnum.newPassword:
        return `<h1>Here's your token, ${user.name}</h1><p>Token: ${token}</p>`
      case SubjectEnum.newBet:
        return `<h1>Good luck, ${user.name}</h1><p>These were the bets you placed: ${betsArray!.map(bet => `<div style="display: inline-block;;border: 2px solid black;border-radius: 10px;"><p style="margin: 6px;">${bet.game}</p><p style="margin: 6px;">${bet.numbers}</p></div>`)}</p>`
    }
  } 
  return `<h1>Admin, a new bet was created!</h1><p>${betsArray!.map(bet => `<div style="display: inline-block;;border: 2px solid black;border-radius: 10px;"><p style="margin: 6px;">${bet.game}</p><p style="margin: 6px;">${bet.numbers}</p></div>`)}`
}