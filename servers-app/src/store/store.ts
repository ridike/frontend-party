import { createStore, Store, combineReducers } from 'redux'
import { authReducer } from '../auth/authReducer'
import { State } from './state'

export function createReduxStore(initialState: State): Store<State> {
  const store: Store<State> = createStore(
    combineReducers({ authReducer }),
    // initialState
  )
  return store
}
