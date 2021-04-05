import * as React from 'react'
import { match as RouteMatch } from 'react-router'
// import { withNavigation } from 'components/hocs'
// import { Navigation } from 'navigation'
import { History } from 'history'
import { SsoService } from '../auth/ssoService'
// import { PageLoader } from 'components/loaders'

interface SsoSuccessParams {
  code: string
  state: string
}

interface SsoSuccessProps {
  history: History
  // navigation: Navigation
  match: RouteMatch<SsoSuccessParams>
  ssoService: SsoService
}

class SsoSuccessPage extends React.Component<SsoSuccessProps> {
  async componentDidMount() {
    // if (this.props.navigation.query().error) {
    //   this.props.history.replace(`/login/?login_error=${this.props.navigation.query().error}`)
    //   return
    // }
    // const { code, state } = this.props.navigation.query()
    // try {
    //   const result = await this.props.ssoService.login(code, state)
    //
    //   if (result.success) {
    //     const redirectPath = sessionStorage.getItem('ssoLoginRedirectPath')
    //     const nextPath = redirectPath ? redirectPath : '/'
    //     this.props.history.replace(nextPath)
    //   } else if (result.errorCode === 'sso_disabled') {
    //     // tslint:disable-next-line:max-line-length
    //     this.props.history.replace(`/sso_auth/link_account?ssoProvider=${encodeURIComponent(result.ssoProvider || '')}&state=${encodeURIComponent(state)}&username=${encodeURIComponent(result.username || '')}`)
    //   } else {
    //     throw new Error('Unknown error code')
    //   }
    // } catch {
    //   this.props.history.replace(`/login/?login_error=1`)
    // }
  }

  render() {
    return (
      {/*<PageLoader
        style={{
          margin: '0',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translateX(-50%) translateY(-50%)'
        }}
      />*/}
    )
  }
}

export default SsoSuccessPage
// export default withNavigation(SsoSuccessPage)
