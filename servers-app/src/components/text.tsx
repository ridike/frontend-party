import styled, { css } from '../styled-typed'

export const Link = styled.a`
  color: ${props => props.theme.colors.brand};
  font-weight: bold;
  transition: color 0.1s ease-in;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.colors.text};
  }
`

export type StatusType = 'success'|'error'|'primary'|'processing'|'info'

interface TextProps {
  status?: StatusType
}

const successCss = css`
  color: ${props => props.theme.colors.status.success};
`

const errorCss = css`
  color: ${props => props.theme.colors.status.error};
`

const processingCss = css`
  color: ${props => props.theme.colors.status.warn};
`

const primaryCss = css`
  color: ${props => props.theme.colors.primary};
`

const infoCss = css`
  color: ${props => props.theme.colors.textLight};
`

export const Text = styled.span<TextProps>`
  ${props => props.status === 'success' ? successCss : ''}
  ${props => props.status === 'error' ? errorCss : ''}
  ${props => props.status === 'primary' ? primaryCss : ''}
  ${props => props.status === 'processing' ? processingCss : ''}
  ${props => props.status === 'info' ? infoCss : ''}
`
