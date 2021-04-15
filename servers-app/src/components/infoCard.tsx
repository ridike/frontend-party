import * as React from 'react'
import styled, { css } from 'styled-typed'
import { transparency } from 'css-utils'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const transitionVisibility = css`
  opacity: 1;
  visibility: visible;
  transition: opacity 0.3s;

  &.hidden {
    height: 0;
    padding: 0;
    margin: 0;
    opacity: 0;
    visibility: hidden;
  }
`

interface CardContainerProps {
  small?: boolean
}

const InfoCardContainer = styled.div<CardContainerProps>`
  background: ${props => transparency(props.theme.colors.status.warn, .8)};
  border: 1px solid ${props => transparency(props.theme.colors.status.warn, .8)};
  padding: 1.2rem;
  display: flex;
  font-size: ${props => props.small ? '.75rem' : '.875rem'};
  border-radius: 4px;
  height: fit-content;
  margin-bottom: 1rem;
  ${transitionVisibility};
`

const InfoText = styled.div`
  margin-top: -0.25rem;
  margin-left: 1rem;
  line-height: 1.4rem;
`

interface CardProps {
  cardHeader?: string
  cardText?: string
  active: boolean
  small?: boolean
  children?: React.ReactNode
}

export function InfoCard(props: CardProps) {
  return (
    <InfoCardContainer small={props.small} className={props.active ? '' : 'hidden'}>
      <FontAwesomeIcon icon={faInfoCircle}/>
      {!props.children &&
        <div>
          <InfoText><strong>{props.cardHeader}</strong></InfoText>
          <InfoText>{props.cardText}</InfoText>
        </div>}
      {props.children}
    </InfoCardContainer>
  )
}
