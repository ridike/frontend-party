import React from 'react'
import ReactDOM from 'react-dom'
import { createPersistedStore } from './store'
import { ReduxBackedSession } from './auth/reduxBackedSession'
import { LoginService } from './auth/loginService'
import { OAuthService } from './auth/oauthService'
import { Navigation } from './navigation'
import './index.css'
import App from './App'
import { createBrowserHistory } from 'history'

const store = createPersistedStore()
const history = createBrowserHistory()
const session = new ReduxBackedSession(store)

const oauthSettings = {
  tokenEndpoint: '', // TODO
  clientId: '',
  clientSecret: ''
}
const oauthService = new OAuthService(oauthSettings)
const loginService = new LoginService(session, oauthService, store)
const navigation = new Navigation(history, history.location)

ReactDOM.render(
  <React.StrictMode>
    <App
      history={history}
      loginService={loginService}
      navigation={navigation}
    />
  </React.StrictMode>,
  document.getElementById('root')
)
