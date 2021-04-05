import 'isomorphic-fetch'
import 'core-js/fn/object/entries'

export interface OAuthSettings {
  tokenEndpoint: string
  clientId: string
  clientSecret: string
  extraHeaders?: { [key: string]: string }
}

export interface AuthTicket {
  accessToken: string
  refreshToken: string
}

export function encodeFormData(obj: { [key: string]: string }) {
  return Object.entries(obj)
    .map(([k, v]) => encodeURIComponent(k) + '=' + encodeURIComponent(v))
    .join('&')
}

export class OAuthService {
  constructor(private settings: OAuthSettings) {}

  async authenticate(username: string, password: string, account: string|null): Promise<AuthTicket> {
    const response = await fetch(this.settings.tokenEndpoint + 'oauth/token/', {
      method: 'POST',
      body: encodeFormData({
        grant_type: 'password',
        client_id: this.settings.clientId,
        client_secret: this.settings.clientSecret,
        username: username,
        password: password,
        account: account ? account : '',
      }),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...this.settings.extraHeaders
      }
    })

    if (response.status !== 200) {
      const reason = await response.text()
      throw new Error(`Authentication failed: ${reason}`)
    }

    const body = await response.json()
    return {
      accessToken: body.access_token,
      refreshToken: body.refresh_token,
    }
  }

  async authenticateWithToken(loginToken: string, account: string|null): Promise<AuthTicket> {
    const response = await fetch(this.settings.tokenEndpoint + 'oauth/token/', {
      method: 'POST',
      body: encodeFormData({
        grant_type: 'login_token',
        client_id: this.settings.clientId,
        client_secret: this.settings.clientSecret,
        login_token: loginToken,
        account: account ? account : '',
      }),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...this.settings.extraHeaders
      }
    })

    if (response.status !== 200) {
      const reason = await response.text()
      throw new Error(`Authentication failed: ${reason}`)
    }

    const body = await response.json()
    return {
      accessToken: body.access_token,
      refreshToken: body.refresh_token,
    }
  }

  async authenticateWithPassToken(username: string, passToken: string, account: string|null): Promise<AuthTicket> {
    const response = await fetch(this.settings.tokenEndpoint + 'oauth/token/', {
      method: 'POST',
      body: encodeFormData({
        grant_type: 'new_user_pass_token',
        client_id: this.settings.clientId,
        client_secret: this.settings.clientSecret,
        username: username,
        pass_token: passToken,
        account: account ? account : '',
      }),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...this.settings.extraHeaders
      }
    })

    if (response.status !== 200) {
      const reason = await response.text()
      throw new Error(`Authentication failed: ${reason}`)
    }

    const body = await response.json()
    return {
      accessToken: body.access_token,
      refreshToken: body.refresh_token,
    }
  }

  async refreshToken(token: string): Promise<AuthTicket> {
    const response = await fetch(this.settings.tokenEndpoint + 'oauth/token/', {
      method: 'POST',
      body: encodeFormData({
        grant_type: 'refresh_token',
        client_id: this.settings.clientId,
        client_secret: this.settings.clientSecret,
        refresh_token: token,
      }),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })

    if (response.status !== 200) {
      const reason = await response.text()
      throw new Error(`Authentication failed: ${reason}`)
    }

    const body = await response.json()
    return {
      accessToken: body.access_token,
      refreshToken: body.refresh_token,
    }
  }
}
