import {
  // Route,
  match as RouteMatch } from 'react-router'
// import { ReactComponent } from 'reactUtils'
// import { Subtract } from 'utility-types'
import { Navigation } from 'navigation'

export interface WithNavigationProps<TRouteParams> {
  navigation: Navigation
  match: RouteMatch<TRouteParams>
}

// export function withNavigation<TProps extends WithNavigationProps<TRouteParams>, TRouteParams>(
//   Component: ReactComponent<TProps>): ReactComponent<Subtract<TProps, WithNavigationProps<TRouteParams>>> {
//   return function(props: TProps) {
//     return (
//       <Route
//         render={({ history, match }) => {
//           return <Component {...props} navigation={new Navigation(history, history.location)} match={match} />
//         }}
//       />
//     )
//   }
// }
