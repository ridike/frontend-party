import 'isomorphic-fetch'
import { AuthTicket } from './oauthService'

export interface Session {
  authTicket(): AuthTicket|null
  initialize(ticket: AuthTicket): Promise<void>
  abandon(): void
}


export interface SsoSignupDetails {
  companyUrl: string
  companyName: string
}

export interface LoginResult {
  success: boolean
  username?: string
  ssoProvider?: 'linkedin'|'google'
  errorCode?: 'sso_disabled'
}

export class SsoService {
  constructor(private dashboardEndpoint: string, private redirectUrl: string, private session: Session,
              private clientId: string, private clientSecret: string) {
  }

  initiateAuth = async (provider: string, signupDetails?: SsoSignupDetails): Promise<void> => {
    // tslint:disable-next-line:max-line-length
    let loginUrl = `${this.dashboardEndpoint}oauth/sso/to/${provider}/?redirect_to=${encodeURIComponent(this.redirectUrl)}`
    if (signupDetails) {
      loginUrl += '&signup_details=' + encodeURIComponent(JSON.stringify(signupDetails))
    }
    window.location.assign(loginUrl)
  }

  async linkAccounts(state: string): Promise<void> {
    const headers: any = {
        'Content-Type': 'application/json',
    }

    let ticket = this.session.authTicket()
    if (ticket) {
      headers['Authorization'] = 'Bearer ' + ticket.accessToken
    }

    const response = await fetch(this.dashboardEndpoint + 'oauth/sso/success/', {
      method: 'POST',
      body: JSON.stringify({
        state,
        redirect_uri: this.redirectUrl,
        client_id: this.clientId,
        client_secret: this.clientSecret
      }),
      mode: 'cors',
      headers,
    })
    if (!response.ok) {
      throw new Error(`SSO service returned status code: ${response.status}`)
    }
    const body = await response.json()
    ticket = {
      accessToken: body.access_token,
      refreshToken: body.refresh_token
    }
    await this.session.initialize(ticket)
  }

  login = async (code: string, state: string): Promise<LoginResult> => {
    const response = await fetch(this.dashboardEndpoint + 'oauth/sso/success/', {
      method: 'POST',
      body: JSON.stringify({
        code,
        state,
        redirect_uri: this.redirectUrl,
        client_id: this.clientId,
        client_secret: this.clientSecret
      }),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const body = await response.json()

    if (response.ok) {
      const ticket = {
        accessToken: body.access_token,
        refreshToken: body.refresh_token
      }
      await this.session.initialize(ticket)
      return { success: true }
    } else if (response.status === 409) {
      return { success: false, username: body.username, ssoProvider: body.provider, errorCode: 'sso_disabled' }
    } else {
      throw new Error(`SSO service returned status code: ${response.status}`)
    }
  }
}
