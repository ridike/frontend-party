import styled from '../styled-typed'
import { Text } from '../components/text'
import { TextInputField } from '../components/input'

export const LoginContainer = styled.div`
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.colors.text};
  display: flex;
  flex: 1 1 auto;
  width: 100%;
  min-height: 100%;

  flex-direction: column-reverse;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

export const LoginForm = styled.form`
  margin: 2em auto;
  & ${TextInputField} {
    border-radius: 6px;
    background-color: #F3F6FA;
    font-size: 0.875em;
    width: 21em;
    line-height: 1.1875em;
    font-weight: normal;
    border: 0;
    padding: 1em 1.25em;
  }

  & button {
    display: inline-block;
    font-weight: 300;
    padding: 0.8125em 3.5em;
    transition: all 0.1s linear;
  }
`

export const LoginHeader = styled.h1`
  color: ${props => props.theme.colors.text};
  font-family: Roboto;
  font-size: 1.875em;
  font-weight: 300;
  line-height: 45px;
  text-align: center;
  margin: 0;

  & > strong {
    color: #3CC4CA;
    font-weight: 500;
  }
`

export const ValidationMessage = styled(Text).attrs(props => ({
  status: 'error'
}))`
  font-size: 0.75em;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease-in;
  display: block;

  &.validation-message-visible {
    opacity: 1;
    visibility: visible;
  }
`
