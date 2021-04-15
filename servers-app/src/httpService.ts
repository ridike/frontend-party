import { Session } from 'auth/session'
import { OAuthService } from 'auth/oauthService'
import { getIEVersion } from 'utils'
import 'isomorphic-fetch'

export interface HttpService {
  fetch(url: RequestInfo, init?: RequestInit): Promise<Response>
  fetchAnonymous(url: RequestInfo, init?: RequestInit): Promise<Response>
  refreshToken(): Promise<void>
}

export class SimpleHttpService {
  fetch(url: RequestInfo, init?: RequestInit): Promise<Response> {
    return fetch(url, init)
  }

  fetchAnonymous(url: RequestInfo, init?: RequestInit): Promise<Response> {
    return fetch(url, init)
  }

  refreshToken(): Promise<void> {
    return Promise.resolve()
  }
}

export class AuthenticatedHttpService implements HttpService {
  constructor(private session: () => Session, private oauthService: OAuthService) {}

  private appendAuthHeader(init?: RequestInit): RequestInit {
    const authTicket = this.session().authTicket()
    if (!authTicket) {
      this.session().abandon()
      throw new Error('Not authenticated')
    }

    init = init || {}

    return {
      ...init,
      headers: {
        ...init.headers,
        'Authorization': 'Bearer ' + authTicket
      },
    }
  }

  private appendHeader(init?: RequestInit): RequestInit {
    init = init || {}

    return {
      ...init,
      headers: {
        ...init.headers,
      },
    }
  }

  private refreshPromise: Promise<string>|null = null
  public async refreshToken() {
    if (this.refreshPromise) {
      await this.refreshPromise
      return
    }

    const authTicket = this.session().authTicket()
    if (!authTicket) {
      throw new Error('Not authenticated')
    }

    try {
      this.refreshPromise = this.oauthService.refreshToken(authTicket)
      const newTicket = await this.refreshPromise
      await this.session().initialize(newTicket)
    } catch (e) {
      this.session().abandon()
      throw e
    } finally {
      this.refreshPromise = null
    }
  }

  fetch = async (url: string, init?: RequestInit): Promise<Response> => {
    let response: Response|null = null
    try {
      response = await fetch(url, this.appendAuthHeader(init))
      if (response.status !== 401) {
        return response
      }
    } catch (e) {
      // ie 10 and 11 has a bug that it treats cors HTTP 401 responses as network errors
      const ieVersion = getIEVersion()
      if (ieVersion < 1 || ieVersion >= 12) {
        throw e
      }
    }

    try {
      await this.refreshToken()
    } catch (e) {
      if (!response) {
        throw new Error('An error has occurred while receiving response')
      }
      return response
    }

    return await fetch(url, this.appendAuthHeader(init))
  }

  fetchAnonymous = async (url: string, init?: RequestInit): Promise<Response> => {
    const authTicket = this.session().authTicket()
    if (!authTicket) {
      return await fetch(url, this.appendHeader(init))
    }

    const response = await this.fetch(url, init)
    if (response.status === 401) {
      return await fetch(url, this.appendHeader(init))
    }

    return response
  }
}
