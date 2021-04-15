import React from 'react'
import ReactDOM from 'react-dom'
import { createPersistedStore } from 'store'
import { ReduxBackedSession } from 'auth/reduxBackedSession'
import { LoginService } from 'auth/loginService'
import { OAuthService } from 'auth/oauthService'
import { AuthenticatedHttpService } from 'httpService'
import { Navigation } from 'navigation'
import { ServersInfoService } from 'servers/infoService'
import 'index.css'
import App from 'App'
import { createBrowserHistory } from 'history'

const store = createPersistedStore()
const history = createBrowserHistory()
const session = new ReduxBackedSession(store)

const oauthSettings = {
  tokenEndpoint: 'https://playground.tesonet.lt/v1/tokens',
}
const serversEndpoint = 'https://playground.tesonet.lt/v1/servers'
const oauthService = new OAuthService(oauthSettings)
const loginService = new LoginService(session, oauthService)
const httpService = new AuthenticatedHttpService(() => session, oauthService)
const serversInfoService = new ServersInfoService(httpService, serversEndpoint)
const navigation = new Navigation(history, history.location)

ReactDOM.render(
  <React.StrictMode>
    <App
      history={history}
      loginService={loginService}
      serversInfoService={serversInfoService}
      navigation={navigation}
      store={store}
    />
  </React.StrictMode>,
  document.getElementById('root')
)
