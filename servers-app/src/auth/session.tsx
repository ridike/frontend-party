export interface Session {
  authTicket(): string|null
  initialize(ticket: string): Promise<void>
  abandon(): void
}
