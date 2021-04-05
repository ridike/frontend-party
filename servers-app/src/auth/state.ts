import { AuthTicket } from './oauthService'

export interface User {
  username: string
  lastLogin: string
  name: string
}

export interface AuthState {
  version: Readonly<number|null>
  ticket: Readonly<AuthTicket|null>
  user: Readonly<User|null>
}

export function createInitialAuthState(): AuthState {
  return {
    version: 2,
    ticket: null,
    user: null
  }
}

export function applySavedAuthState(state: AuthState|undefined): AuthState {
  const initial = createInitialAuthState()
  const version = initial.version || 0
  if (!state || !state.version || state.version < version) {
    return initial
  }

  return { ...initial, ...state }
}
