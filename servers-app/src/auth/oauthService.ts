import 'isomorphic-fetch'

export interface OAuthSettings {
  tokenEndpoint: string
}

export function encodeFormData(obj: { [key: string]: string }) {
  return Object.entries(obj)
    .map(([k, v]) => encodeURIComponent(k) + '=' + encodeURIComponent(v))
    .join('&')
}

export class OAuthService {
  constructor(private settings: OAuthSettings) {}

  async authenticate(username: string, password: string): Promise<string> {
    const response = await fetch(this.settings.tokenEndpoint, {
      method: 'POST',
      body: encodeFormData({
        username: username,
        password: password,
      }),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    if (response.status !== 200) {
      const reason = await response.text()
      throw new Error(`Authentication failed: ${reason}`)
    }

    const body = await response.json()
    return body.token
  }

  async refreshToken(token: string): Promise<string> {
    const response = await fetch(this.settings.tokenEndpoint, {
      method: 'POST',
      body: encodeFormData({
        grant_type: 'refresh_token',
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
    return body.token
  }
}
