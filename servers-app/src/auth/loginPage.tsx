// import React from 'react'
import logo from '../logo.svg'
// import { Navigation } from 'navigation'
import { History } from 'history'
import { SsoService } from './ssoService'
// import { match as RouteMatch } from 'react-router'

interface LoginPageProps {
  // login: (u: string, p: string) => Promise<boolean>
  history: History
  ssoService: SsoService
  // navigation: Navigation
  // match: RouteMatch<{}>
}

// export interface LoginState {
//   username: string
//   password: string
//   message: string
//   ssoMessage: string
// }

export default function LoginPage(props: LoginPageProps) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React ala
        </a>
      </header>
    </div>
  )
}
