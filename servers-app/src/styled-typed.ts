import * as styledComponents from 'styled-components'
import { ThemedStyledComponentsModule } from 'styled-components'

import { DashboardTheme } from './theme'

const {
  default: styled,
} = styledComponents as unknown as ThemedStyledComponentsModule<DashboardTheme>

export * from 'styled-components'
export default styled;
