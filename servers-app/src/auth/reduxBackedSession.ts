import { Store } from 'redux'
import { Session } from './session'
import { AuthTicket } from './oauthService'
import { State } from '../store'
import { userLoggedIn, userLoggedOut } from './actions'

export class ReduxBackedSession implements Session {
  constructor(
    private store: Store<State>) { }

  authTicket(): AuthTicket | null {
    return this.store.getState().auth.ticket
  }

  async initialize(ticket: AuthTicket) {
    this.store.dispatch(userLoggedIn(ticket))
  }

  abandon(): void {
    this.store.dispatch(userLoggedOut())
  }
}
