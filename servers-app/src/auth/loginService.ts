import { Session } from './session'
import { OAuthService } from './oauthService'

export class LoginService {
  constructor(private session: Session, private oauthService: OAuthService) {
  }

  private async authenticate(username: string, password: string): Promise<string|null> {
    try {
      return await this.oauthService.authenticate(username, password)
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

  logout = () => {
    this.session.abandon()
  }

}
