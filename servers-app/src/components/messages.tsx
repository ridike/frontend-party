import * as React from 'react'
import styled from 'styled-typed'
import { transparency } from 'css-utils'
import { ActionButton, ButtonKind } from 'components/buttons'

export type MessageKind = 'error'|'success'|'warn'

interface PageTopMessageProps {
  children: React.ReactNode
  showMessage: boolean
  onDismiss?: () => void
}

interface ContainerProps {
  kind: MessageKind
  paddingRight?: boolean
}

export const HeaderMessageContainer = styled.div`
  position: relative;
  z-index: 199;
`

export const MessageContainer = styled.div`
  position: absolute;
  top: .5em;
  left: 0;
  z-index: 99;
  width: 100%;
  > .message-visible {
    width: 80%;
    margin: auto;
  }
`

const Container = styled.div<ContainerProps>`
  font-size: 0.85em;
  padding-right: ${props => props.paddingRight ?  '2em' : ''};
  position: fixed;
  top: 2em;
  left: 50%;
  transform: translateX(-50%);
  max-width: 960px;
  background-color: #FFF;
  border-radius: 0.25rem;
  box-shadow: 0 1px 15px 0 rgba(35,48,57,0.25);
  opacity: 0;
  visibility: hidden;
  transition: opacity .3s ease-in, visibility .3s .3s;

  &.message-visible {
    opacity: 1;
    visibility: visible;
    transition-delay: 0s;
  }
`

const ContainerBackground = styled(Container)<ContainerProps>`
  height: 100%;
  width: 100%;
  max-width: unset;
  top: 0em;
  border: none;
  z-index: -1;
  background: ${props => transparency(props.theme.colors.status[props.kind], 0.9)};

  &.message-visible {
    transition: .3s ease-in;
  }
`

const Content = styled.div`
  height: 100%;
  max-width: 100%;
  padding: 0.6em 1em 0.6em 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #FFFFFF;
  opacity: 0;
  transition: opacity .5s ease-in;

  &.message-visible {
    opacity: 1;
  }
`
const CloseButton = styled.div`
  position: absolute;
  right: .5em;
  color: #FFFFFF;
  font-size: 1.5em;
  font-weight: 300;
  cursor: pointer;
  transition: opacity 0.2s ease-in;
  display: flex;
  align-items: center;
  height: 100%;

  &:hover {
    opacity: 1;
  }
`

export function PageTopMessage ({showMessage, kind, onDismiss, children, style}:
    PageTopMessageProps & ContainerProps & React.InputHTMLAttributes<HTMLElement>) {
  return (
    <Container kind={kind} className={showMessage ? 'message-visible' : ''} style={style} paddingRight={!!onDismiss}>
      <ContainerBackground kind={kind} className={showMessage ? 'message-visible' : ''}/>
      <CloseButton onClick={onDismiss}>&times;</CloseButton>
      <Content className={showMessage ? 'message-visible' : ''}>
        <div style={{width: '100%'}}>{children}</div>
      </Content>
    </Container>
  )
}

interface MessageButtonType {
  kind: ButtonKind
  buttonText: string
  postButtonText: string
  onClick: () => void
  secondary?: boolean
}

export type MessageButton = MessageButtonType|null

export interface Message {
  id: string
  status: MessageKind
  text: string
  visible: boolean
  actionButton?: MessageButton
}

interface MessageProps {
  messages: Message[]
  hideMessage: (id: string) => void
  className?: string
  style?: React.CSSProperties
  stacked?: boolean
}

export function Messages({ messages, hideMessage, className, style, stacked }: MessageProps) {
  return (
    <HeaderMessageContainer className={className} style={style}>
      {messages.map((m, i) => (
        <PageTopMessage
          key={m.id}
          kind={m.status}
          showMessage={m.visible}
          onDismiss={() => hideMessage(m.id)}
          style={stacked ? {top: `${4 * (i) + 1}em`} : {}}
        >
          {m.text}
          {m.actionButton &&
            <>
              <ActionButton
                kind={m.actionButton.kind}
                style={{margin: '.3em .7em 0 .7em'}}
                size="small"
                onClick={m.actionButton.onClick}
              >{m.actionButton.buttonText}
              </ActionButton>
              {m.actionButton.postButtonText}
            </>
          }
        </PageTopMessage>
      ))}
    </HeaderMessageContainer>
  )
}
