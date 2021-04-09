import { Session } from './session'
import { OAuthService, AuthTicket } from './oauthService'
// import { Base64 } from 'js-base64'
import { Store } from 'redux'

export class LoginService {
  constructor(private session: Session, private oauthService: OAuthService, private store: Store) {

  }

  private async authenticate(username: string, password: string): Promise<AuthTicket|null> {
    try {
      const account = this.store.getState().preferences.activeAccount
      return await this.oauthService.authenticate(username, password, account)
    } catch (e) {
      return null
    }
  }

  login = async (username: string, password: string): Promise<boolean> => {
    const ticket = await this.authenticate(username, password)
    if (!ticket) {
      return false
    }
    await this.session.initialize(ticket)
    return true
  }

  loginWithToken = async (loginToken: string): Promise<boolean> => {
    try {
      const account = this.store.getState().preferences.activeAccount
      const ticket = await this.oauthService.authenticateWithToken(loginToken, account)
      await this.session.initialize(ticket)
      return true
    } catch (e) {
      return false
    }
  }

  loginWithNewUserPassToken = async (username: string, token: string): Promise<boolean> => {
    const account = this.store.getState().preferences.activeAccount
    const ticket = await this.oauthService.authenticateWithPassToken(username, token, account)
    if (!ticket) {
      return false
    }
    await this.session.initialize(ticket)
    return true
  }

  logout = () => {
    this.session.abandon()
  }

  // ensureTokenNotExpired = async (ticket: AuthTicket): Promise<AuthTicket> => {
  //   try {
  //     const payload = JSON.parse(Base64.decode(ticket.accessToken.split('.')[1]))
  //     const secondsLeft = payload.exp - Math.floor(Date.now() / 1000)
  //     if (secondsLeft < 30) {
  //       const newTicket = await this.oauthService.refreshToken(ticket.refreshToken)
  //       await this.session.initialize(newTicket)
  //       return newTicket
  //     }
  //   } catch (e) {
  //     this.session.abandon()
  //     throw e
  //   }
  //   return ticket
  // }
}
