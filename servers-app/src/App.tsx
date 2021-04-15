import { ThemeProvider } from './styled-typed'
import { History } from 'history'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { ServersInfoService } from 'servers/infoService'
import { State } from 'store'
import { RequireAuth } from 'auth/requireAuth'
import { LoginService } from 'auth/loginService'
import { Header } from 'components/header'
import { PageContentScroll, PageContentSizer, ContentWrapper, Layout } from 'components/appComponents'
import { Navigation } from 'navigation'
import { Router, Route, Switch, RouteComponentProps, Redirect } from 'react-router-dom'
import { defaultTheme } from 'theme'
import LoginPage from 'auth/loginPage'
import ServersList from 'servers'

interface PageContentProps {
  children?: React.ReactNode | undefined
}

export function PageContent({ children, ...rest }:
  PageContentProps | React.HTMLAttributes<HTMLDivElement>) {
  return (
    <PageContentScroll {...rest}>
      <PageContentSizer className="PageContentSizer">{children}</PageContentSizer>
    </PageContentScroll>
  )
}

interface AppProps {
  history: History
  loginService: LoginService
  serversInfoService: ServersInfoService
  navigation: Navigation
  store: Store<State>
}

function withHeader(props: AppProps, component: JSX.Element) {
  return (
    <Layout>
      <ContentWrapper>
        <Header logout={props.loginService.logout} history={props.history}/>
        <PageContent>
          {component}
        </PageContent>
      </ContentWrapper>
    </Layout>
  )
}

function App(props: AppProps) {
  return (
    <Provider store={props.store}>
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
              render={(p: RouteComponentProps<any>) => withHeader(props,
                <RequireAuth>
                  <ServersList
                    history={p.history}
                    location={p.location}
                    logout={props.loginService.logout}
                    serversInfoService={props.serversInfoService}
                  />
                </RequireAuth>)}
            />
            <Route
              render={() => <Redirect to={`/servers`} />}
            />
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  )
}

export default App
