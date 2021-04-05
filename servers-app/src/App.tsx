// import React from 'react';
import { ThemeProvider } from './styled-typed'
import { History } from 'history'
import { RequireAuth } from './auth/requireAuth'
import { SsoService } from './auth/ssoService'
import SsoSuccessPage from './auth/ssoSuccessPage'
import { Router, Route, Switch, RouteComponentProps } from 'react-router-dom'
import { defaultTheme } from './theme'
import LoginPage from './auth/loginPage'
import ServersList from './servers'
import './App.css'

interface AppProps {
  history: History
  ssoService: SsoService
}

function App(props: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Router history={props.history}>
        <Switch>
          <Route
            exact
            path="/login"
            render={(p: RouteComponentProps<any>) =>
              <LoginPage
                // login={this.props.loginService.login}
                history={p.history}
                ssoService={props.ssoService}
              />}
          />
          <Route
            exact
            path="/servers"
            render={(p: RouteComponentProps<any>) =>
              <RequireAuth>
                <ServersList
                  history={p.history}
                  // logout={this.props.loginService.logout}
                  // httpService={this.props.httpService}
                  // loginService={props.loginService}
                  // serversService={}
                />
              </RequireAuth>
            }
          />
          <Route
              exact
              path="/sso_auth/success"
              render={(p: RouteComponentProps<any>) =>
                <SsoSuccessPage
                  history={p.history}
                  ssoService={props.ssoService}
                  match={p.match}
                />}
            />
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App
