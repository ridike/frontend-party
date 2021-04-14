import { HttpService } from '../httpService'

export interface Server {
  name: string
  distance: number
}

export class ServersInfoService {
  constructor(private httpService: HttpService, private sereversEndpoint: string) {}

  async getServersList(): Promise<Server[]> {
    const response = await this.httpService.fetch(`${this.sereversEndpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    if (!response.ok) {
      throw new Error(`Servers Api has returned status code: ${response.status}`)
    }
    const data = await response.json()
    return data
  }
}
