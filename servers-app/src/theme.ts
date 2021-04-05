export interface StatusColors {
  success: string
  error: string
  warn: string
  disabled: string
}

export interface Colors {
  background: string
  brand: string
  primary: string
  secondary: string
  text: string
  textLight: string
  inputBorder: string
  status: StatusColors
}

export interface Fonts {
  primary: string
  secondary: string
}

export interface DashboardTheme {
  fonts: Fonts
  colors: Colors
}

export const defaultTheme: DashboardTheme = {
  fonts: {
    primary: 'Roboto, sans-serif',
    secondary: 'Roboto Condensed, sans-serif',
  },
  colors: {
    background: '#F5F7FA',
    brand: '#33C4CA',
    primary: '#9369BD',
    secondary: '#F77461',
    text: '#394954',
    textLight: '#A1B0B2',
    inputBorder: '#98A1A7',
    status: {
      success: '#00A20B',
      error: '#F77461',
      warn: '#FFC85F',
      disabled: '#D2D6D6',
    }
  }
}
