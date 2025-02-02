import { AuthState, createInitialAuthState, applySavedAuthState } from 'auth/state'

export interface State {
  auth: Readonly<AuthState>
}

export function applySavedState(saved: Partial<State>|undefined): State {
  const initial = { auth: createInitialAuthState() }
  if (!saved) {
    return initial
  }

  return {
    ...initial,
    ...saved,
    auth: applySavedAuthState(saved.auth ? saved.auth : undefined),
  }
}
