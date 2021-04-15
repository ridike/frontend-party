import { match as RouteMatch } from 'react-router'
import { Navigation } from 'navigation'

export interface WithNavigationProps<TRouteParams> {
  navigation: Navigation
  match: RouteMatch<TRouteParams>
}
