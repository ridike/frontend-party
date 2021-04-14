import { RootAction } from '../store'
import { createInitialAuthState, AuthState } from './state'

export function authReducer(state: Readonly<AuthState>|undefined, action: RootAction): AuthState {
  state = state || createInitialAuthState()

  switch (action.type) {
    case 'UserLoggedIn':
      return {
        ...state,
        ticket: action.payload.ticket,
      }
    case 'UserLoggedOut':
      return {
        ticket: null,
        user: null,
      }
    default:
      return state
  }
}
