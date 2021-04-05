import React from 'react'
import ReactDOM from 'react-dom'
import { createPersistedStore } from './store'
import { SsoService } from './auth/ssoService'
import { ReduxBackedSession } from './auth/reduxBackedSession'
import './index.css'
import App from './App'
import { createBrowserHistory } from 'history'

const store = createPersistedStore()
const history = createBrowserHistory()
const session = new ReduxBackedSession(store)

const backendEndpoint = ''
const clientId = ''
const clientSecret = ''
const ssoRedirectUrl = window.location.origin + '/sso_auth/success/'

const ssoService = new SsoService(backendEndpoint, ssoRedirectUrl, session, clientId, clientSecret)

ReactDOM.render(
  <React.StrictMode>
    <App
      history={history}
      ssoService={ssoService}
    />
  </React.StrictMode>,
  document.getElementById('root')
)
