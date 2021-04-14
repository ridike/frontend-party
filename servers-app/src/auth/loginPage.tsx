import * as React from 'react'
import { History } from 'history'
import styled from '../styled-typed'
import { Navigation } from '../navigation'
import { IconTextInput } from '../components/input'
import { Link } from '../components/text'
import { delay } from '../utils'
import {
  ValidationMessage,
  LoginForm,
  LoginHeader,
  LoginContainer
} from '../components/loginComponents'
import { ActionButton } from '../components/buttons'
import { InfoCard } from '../components/infoCard'

const PasswordWrapper = styled.div`
  position: relative;
  z-index: 10;
`

const ForgotPasswordLink = styled(Link)`
  display: block;
  position: absolute;
  z-index: 15;
  top: 50%;
  right: 1.25em;
  transform: translateY(-50%);
  font-size: 0.625em;
  line-height: 1.625em;
	color: ${props => props.theme.colors.textLight};
  transition: all 0.1s linear;
  &:focus,
  &:hover {
    opacity: 0.75;
  }
`

const PwdNotification = styled.div`
  position: absolute;
  display: flex;
  left: 27em;
  width: 21em;
  top: 0;
  font-size: .8em;
  opacity: 0;
  visiblity: hidden;
  transition: opacity .5s ease-in, visibility 0s .5s ease-in;
  &.visible {
    opacity: 1;
    visibility: visible;
    transition: opacity .5s ease-in, visibility .5s ease-in;
  }
`

interface LoginPageProps {
  login: (u: string, p: string) => Promise<boolean>
  history: History
  navigation: Navigation
}

export default function LoginPage(props: LoginPageProps) {
  const [username, setUsername] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [message, setMessage] = React.useState<string>('')
  const [showForgotPwdNotification, setShowForgotPwdNotification] = React.useState<boolean>(false)

  React.useEffect(() => {
    const resetPwdNotification = async () => {
      await delay(4000)
      setShowForgotPwdNotification(false)
    }
    if (!!showForgotPwdNotification) {
      resetPwdNotification()
    }
  }, [showForgotPwdNotification])

  React.useEffect(() => {
    setMessage('')
  }, [username, password])

  const onSubmit = (evt: any) => {
    evt.preventDefault()
    if (!username || !password) {
      setMessage('Login and password are required')
      return
    }
    setMessage('')
    props.login(username, password)
      .then(success => {
        if (success) {
          const destinationPath = props.navigation.query().next
          if (destinationPath) {
            if (destinationPath[0] !== '/') {
              props.history.push('/' + destinationPath)
            } else {
              props.history.push(destinationPath)
            }
          } else {
            props.history.push('/')
          }
        } else {
          setMessage('Invalid credentials')
        }
      }).catch(() => {
        setMessage('An unknown error has occured. Please try again later.')
      })
  }

  return (
    <LoginContainer>
      <LoginForm id="login-form" noValidate onSubmit={onSubmit}>
        <LoginHeader>Log in to the <strong>Overview</strong></LoginHeader>
        <IconTextInput
          id="login-username"
          type="text"
          status={message ? 'error' : 'normal'}
          block
          placeholder="Username"
          value={username}
          onChange={evt => setUsername(evt.target.value)}
        />
        <PasswordWrapper>
          <IconTextInput
            id="login-password"
            block
            type="password"
            placeholder="Password"
            value={password}
            onChange={evt => setPassword(evt.target.value)}
          />
          <ForgotPasswordLink href="#" onClick={() => setShowForgotPwdNotification(true)}>Forgot your password?</ForgotPasswordLink>
          <PwdNotification className={showForgotPwdNotification ? 'visible' : ''}>
            <InfoCard
              active
              cardHeader=""
              cardText={`Very shortly we'll implement a special reset-password page. For now, please contact us at ridike@gmail.com.`}
            />
          </PwdNotification>
        </PasswordWrapper>
        <ValidationMessage id="login-message" className={message ? 'validation-message-visible' : ''}>
          {message || ''}
        </ValidationMessage>
        <ActionButton
          id="login-submit"
          size="large"
          type="submit"
          block
        >
          Log in
        </ActionButton>
      </LoginForm>
    </LoginContainer>
  )
}
