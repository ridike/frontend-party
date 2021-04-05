import * as React from 'react'
import { Route, Redirect } from 'react-router'
import { connect } from 'react-redux'
import { State } from '../store'
import { AuthTicket } from './oauthService'

function mapStateToProps(state: State) {
  return {
    ticket: state.auth.ticket,
  }
}

export interface RequireAuthProps {
  ticket: AuthTicket|null
  children: React.ReactNode
}

export const RequireAuth = connect(mapStateToProps)((props: RequireAuthProps) => {
  if (props.ticket) {
    return <>{props.children}</>
  }

  return (
    <Route
      render={({ location }) =>
        <Redirect to={'/login/?next=' + encodeURIComponent(location.pathname + location.search)} />}
    />
  )
})
