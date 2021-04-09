import { AuthTicket } from './oauthService'

export interface Session {
  authTicket(): AuthTicket|null
  initialize(ticket: AuthTicket): Promise<void>
  abandon(): void
}
