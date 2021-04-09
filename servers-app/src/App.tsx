import { ThemeProvider } from './styled-typed'
import { History } from 'history'
import { RequireAuth } from './auth/requireAuth'
import { LoginService } from './auth/loginService'
import { Navigation } from './navigation'
import { Router, Route, Switch, RouteComponentProps, Redirect } from 'react-router-dom'
import { defaultTheme } from './theme'
import LoginPage from './auth/loginPage'
import ServersList from './servers'
import './App.css'

interface AppProps {
  history: History
  loginService: LoginService
  navigation: Navigation
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
                login={props.loginService.login}
                history={p.history}
                navigation={props.navigation}
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
            render={() => <Redirect to={`/servers`} />}
          />
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App
