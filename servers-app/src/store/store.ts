import { createStore, Store, combineReducers } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import { authReducer } from '../auth/authReducer'
import { State } from './state'

export function createReduxStore(initialState: State): Store<State> {
  const store: Store<State> = createStore(
    combineReducers({ auth: authReducer }),
    initialState,
    devToolsEnhancer({ name: document.title })
  )
  return store
}
