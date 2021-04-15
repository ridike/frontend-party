import styled from 'styled-typed'
import { TextInputField } from 'components/input'
import { transparency } from 'css-utils'

export const LoginContainer = styled.div`
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.colors.text};
  display: flex;
  min-height: 100%;
  height: 100vh;
  align-items: center;
  background-color: #DFDBE5;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4' fill-rule='nonzero'%3E%3Cpath d='M29 58.58l7.38-7.39A30.95 30.95 0 0 1 29 37.84a30.95 30.95 0 0 1-7.38 13.36l7.37 7.38zm1.4 1.41l.01.01h-2.84l-7.37-7.38A30.95 30.95 0 0 1 6.84 60H0v-1.02a28.9 28.9 0 0 0 18.79-7.78L0 32.41v-4.84L18.78 8.79A28.9 28.9 0 0 0 0 1.02V0h6.84a30.95 30.95 0 0 1 13.35 7.38L27.57 0h2.84l7.39 7.38A30.95 30.95 0 0 1 51.16 0H60v27.58-.01V60h-8.84a30.95 30.95 0 0 1-13.37-7.4L30.4 60zM29 1.41l-7.4 7.38A30.95 30.95 0 0 1 29 22.16 30.95 30.95 0 0 1 36.38 8.8L29 1.4zM58 1A28.9 28.9 0 0 0 39.2 8.8L58 27.58V1.02zm-20.2 9.2A28.9 28.9 0 0 0 30.02 29h26.56L37.8 10.21zM30.02 31a28.9 28.9 0 0 0 7.77 18.79l18.79-18.79H30.02zm9.18 20.2A28.9 28.9 0 0 0 58 59V32.4L39.2 51.19zm-19-1.4a28.9 28.9 0 0 0 7.78-18.8H1.41l18.8 18.8zm7.78-20.8A28.9 28.9 0 0 0 20.2 10.2L1.41 29h26.57z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  @media screen and (max-width: 360px) {
    width: max-content;
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
    color: ${props => props.theme.colors.primary};
    font-weight: 500;
  }
`

export const ValidationMessage = styled.div`
  color: #FFFFFF;
  font-size: 0.85em;
  opacity: 0;
  visibility: hidden;
  transition: opacity .5s ease-in;
  display: block;
  border-radius: 0.25rem;
  background: ${props => transparency(props.theme.colors.status.error, 0.9)};

  &.validation-message-visible {
    opacity: 1;
    visibility: visible;
    margin: .5em 0;
    padding: 1em;
  }
`
