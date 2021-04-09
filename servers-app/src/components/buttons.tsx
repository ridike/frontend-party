import React from 'react'
import styled, { css, FlattenInterpolation } from '../styled-typed'
import { transparency } from '../css-utils'

export type ButtonKind = 'default'|'disabled'|'action'|'success'|'destructive'
export type ButtonSize = 'small'|'medium'|'large'

interface ActionButtonProps {
  className?: string
  style?: React.CSSProperties
  block?: boolean
  kind?: ButtonKind
  size?: ButtonSize
  secondary?: boolean
  doneText?: string
  width?: string
}

const defaultCss = css`
  background: ${props => props.theme.colors.brand};

  &:hover:not(:disabled) {
    background: hsl(180, 61%, 40%);
  }
`
const actionCss = css`
  background: ${props => props.theme.colors.altPrimary};

  &:hover:not(:disabled) {
    background: hsl(212, 90%, 60%);
  }
`
const successCss = css`
  background: ${props => props.theme.colors.status.success};
`
const destructiveCss = css`
  background: ${props => props.theme.colors.status.error};

  &:hover:not(:disabled) {
    background: hsl(8, 90%, 60%);
  }
`
const disabledCss = css`
  background: ${props => props.theme.colors.status.disabled};
  color: ${props => props.theme.colors.textLight};
`

const kinds: { [key in ButtonKind]: FlattenInterpolation<any> } = {
  default: defaultCss,
  action: actionCss,
  success: successCss,
  destructive: destructiveCss,
  disabled: disabledCss,
}

const secondaryDefaultCss = css`
  border: 1px solid ${props => props.theme.colors.status.disabled};
  color: ${props => props.theme.colors.text};

  &:hover:not(:disabled) {
    background: ${props => transparency(props.theme.colors.status.disabled, 0.3)};
    border: 1px solid transparent;
  }
`
const secondaryActionCss = css`
  border: 1px solid ${props => transparency(props.theme.colors.altPrimary, 0.3)};
  color: ${props => props.theme.colors.altPrimary};

  &:hover:not(:disabled) {
    background: ${props => transparency(props.theme.colors.altPrimary, 0.3)};
    border: 1px solid transparent;
  }
`
const secondaryDestructiveCss = css`
  border: 1px solid ${props => transparency(props.theme.colors.status.error, 0.3)};
  color: ${props => props.theme.colors.status.error};
  font-weight: 500;

  &:hover:not(:disabled) {
    background: ${props => transparency(props.theme.colors.status.error, 0.3)};
    border: 1px solid transparent;
  }
`
const secondaryDisabledCss = css`
  ${disabledCss}
  border: 1px solid ${props => props.theme.colors.status.disabled};
`

const secondaryKinds: { [key in ButtonKind]: FlattenInterpolation<any> } = {
  default: secondaryDefaultCss,
  action: secondaryActionCss,
  success: successCss,
  destructive: secondaryDestructiveCss,
  disabled: secondaryDisabledCss,
}

const blockCss = css`
  display: block;
  width: 100%;
`
const smallCss = css`
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  font-weight: normal;
`
const mediumCss = css`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 500;
`
const largeCss = css`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
`

const sizes: { [key in ButtonSize]: FlattenInterpolation<any> } = {
  small: smallCss,
  medium: mediumCss,
  large: largeCss,
}

const secondarySmallCss = css`
  ${smallCss}
  padding: 0.188rem 0.5rem;
`
const secondaryMediumCss = css`
  ${mediumCss}
  font-weight: normal;
  padding: 0.438rem 1rem;
`
const secondaryLargeCss = css`
  ${largeCss}
  padding: 0.6875rem 1.43rem;
`

const secondarySizes: { [key in ButtonSize]: FlattenInterpolation<any> } = {
  small: secondarySmallCss,
  medium: secondaryMediumCss,
  large: secondaryLargeCss,
}

const ActionButtonBaseCss = css`
    display: inline-block;
    text-align: center;
    font-size: 1rem;
    line-height: 100%;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    color: ${props => props.theme.colors.textInverse};
    background: inherit;
    ${(props: ActionButtonProps) => props.width ? `width: ${props.width}` : ''}

    ${(props: ActionButtonProps) => props.secondary ?
      secondarySizes[props.size || 'medium'] : sizes[props.size || 'medium']}

    ${(props: ActionButtonProps) => props.secondary ?
        secondaryKinds[props.kind || 'default'] : kinds[props.kind || 'default']}

    font-family: ${props => props.theme.fonts.primary};
    ${(props: ActionButtonProps) => props.block ? blockCss : ''}

    transition: background 0.1s ease-in,
                color 0.1s ease-in,
                opacity 0.1s ease-in
                box-shadow 0.05s ease-in;

    &:focus {
      outline: none;
    }

    &:disabled {
      cursor: not-allowed;
      ${(props: ActionButtonProps) => props.secondary ? secondaryDisabledCss : disabledCss}
    }
`

const ActionButtonElement = styled.button.attrs(props => ({
      type: props.type ? props.type : 'button'
    }))<ActionButtonProps>`
    ${ActionButtonBaseCss}
`

interface ButtonComponentProps {
  children?: React.ReactNode
  className?: string
  onClick?: (evt: React.MouseEvent<any>) => Promise<void>|void
}

interface ButtonProps<T> {
  component: React.ComponentType<T>
  componentProps: T
}

class Button<T extends ButtonComponentProps> extends React.Component<ButtonProps<T>> {
  constructor(props: ButtonProps<T>) {
    super(props)
  }

  onClick = async (evt: React.MouseEvent<any>) => {
    const clickHandler = this.props.componentProps.onClick || (() => {})
    await clickHandler(evt)
  }

  render() {
    const Component = this.props.component
    const props = Object.assign({}, this.props.componentProps)
    const children = props.children
    const classNames = (props.className || '').split(' ').filter(x => x !== '')
    delete props.children
    delete props.onClick
    delete props.className
    return (
      <Component onClick={this.onClick} className={classNames.join(' ')} {...props}>
        {children}
      </Component>
    )
  }
}

export const ActionButton = (props: ActionButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) =>
  <Button component={ActionButtonElement} componentProps={props} />
