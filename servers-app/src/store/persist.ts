import { Store } from 'redux'
import throttle from 'lodash/throttle'
import { createReduxStore } from './store'
import { applySavedState, State } from './state'

function loadState(): Partial<State>|undefined {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return undefined
    }

    return JSON.parse(serializedState)
  } catch (_) {
    return undefined
  }
}

function saveState(state: Partial<State>) {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (_) {
  }
}

export function createPersistedStore(): Store<State> {
  const savedState = loadState()
  const state = applySavedState(savedState)
  const store = createReduxStore(state)

  store.subscribe(throttle(() => saveState({
    auth: store.getState().auth
  })))
  return store
}
