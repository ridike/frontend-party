export interface User {
  username: string
}

export interface AuthState {
  ticket: Readonly<string|null>
  user: Readonly<User|null>
}

export function createInitialAuthState(): AuthState {
  return {
    ticket: null,
    user: null
  }
}

export function applySavedAuthState(state: AuthState|undefined): AuthState {
  const initial = createInitialAuthState()
  if (!state) {
    return initial
  }

  return { ...initial, ...state }
}
