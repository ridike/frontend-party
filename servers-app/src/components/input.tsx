import * as React from 'react'
import styled, { css } from 'styled-typed'
import { Debounce } from 'debounce'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const INPUT_HEIGHT = '2.2rem'

const blockCss = css`
  display: block;
  width: 100%;
  margin-bottom: 0.625em;
`

const successCss = css`
  border: 1px solid ${props => props.theme.colors.status.success};
`

const errorCss = css`
  border: 1px solid ${props => props.theme.colors.status.error};
  font-weight: normal;
`

const commonStyles = css`
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  transition: border 0.1s ease-in;

  &:focus {
    outline: none;
    border: 1px solid ${props => props.theme.colors.brand};
  }
  font-size: 0.875rem;
  line-height: 1.1875rem;
  height: ${INPUT_HEIGHT};
  font-weight: lighter;
  border-radius: 0.375em;
  padding: 0.625em 1em;
  ::placeholder {
    color: ${props => props.theme.colors.textLight};
    font-style: italic;
    font-weight: lighter;
  }

  &:disabled {
    color: ${props => props.theme.colors.textLight};
    cursor: not-allowed;
  }

  -moz-appearance:textfield;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }
`

interface IconTextInputProps extends TextInputProps {
  icon?: IconProp
}

export function IconTextInput(
  {
    icon,
    block,
    className,
    ...rest
  }: IconTextInputProps & React.InputHTMLAttributes<HTMLInputElement>) {
  const classNames = []
  if (className) {
    classNames.push(className)
  }

  if (icon) {
    classNames.push('with-icon')
  }


  return (
    <IconTextInputContainer block={block}>
      <IconTextInputField {...rest} className={classNames.join(' ')} block />
      {icon &&
        <FontAwesomeIcon icon={icon} className="text-input-icon" />
      }
    </IconTextInputContainer>
  )
}

export type FinishTypingHandler = (v: string) => void

interface TextInputProps {
  block?: boolean
  status?: 'normal'|'success'|'error'
  onFinishTyping?: FinishTypingHandler
  finishTypingDelay?: number
  showCharsLeft?: boolean
  whiteBackground?: boolean
  border?: boolean
}

const inputFieldStyles = css`
  ${commonStyles}
  border: 1px solid transparent;
  ${(props: TextInputProps) => props.block ? blockCss : ''}
  ${(props: TextInputProps) => props.status === 'success' ? successCss : ''}
  ${(props: TextInputProps) => props.status === 'error' ? errorCss : ''}

  &:focus {
    ${(props: TextInputProps) => props.status === 'success' ? successCss : ''}
    ${(props: TextInputProps) => props.status === 'error' ? errorCss : ''}
  }
  ${props => props.whiteBackground ?
    `background-color: #FFF;`
    : ''
  };
  ${props => props.border ?
    `border: 1px solid ${props.theme.colors.textLight};`
    : ''
  };
`

export const TextInputField = styled.input.attrs<React.InputHTMLAttributes<HTMLInputElement>>(props => ({
  type: props.type ? props.type : 'text'
}))`
  ${inputFieldStyles}
`

function restrictToMaxLength(value: number|string|readonly string[], max: number): number|string|readonly string[] {
  let newValue = value.toString()
  if (newValue.length > max) {
    newValue = newValue.slice(0, max)
    return newValue
  }
  return value
}

class TextInput extends React.PureComponent<TextInputProps & React.InputHTMLAttributes<HTMLInputElement>, {}> {
  private finishTypingLater: Debounce<string>|undefined

  constructor(props: TextInputProps & React.InputHTMLAttributes<HTMLInputElement>) {
    super(props)

    if (this.props.onFinishTyping) {
      this.finishTypingLater = new Debounce(this.props.onFinishTyping, this.props.finishTypingDelay || 500)
    }
  }

  componentWillUnmount() {
    if (this.finishTypingLater) {
      this.finishTypingLater.clear()
    }
  }

  onChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target.cloneNode() as HTMLInputElement
    if (!!target.value) {
      if (typeof this.props.maxLength !== 'undefined') {
        target.value = restrictToMaxLength(target.value, this.props.maxLength) as string
      }
    }
    event.target = target;

    if (this.props.onChange) {
      this.props.onChange(event)
    }
    if (this.finishTypingLater) {
      this.finishTypingLater.trigger(target.value)
    }
  }

  onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const event = e
    if (this.props.onBlur) {
      this.props.onBlur(event)
    }
  }

  render() {
    const { onChange, value, maxLength, onFinishTyping, onBlur, ...rest } = this.props
    let newValue = value
    if (!!newValue && typeof maxLength !== 'undefined') {
      newValue = restrictToMaxLength(newValue, maxLength)
    }
    return (
      <TextInputField
        onChange={this.onChanged}
        value={newValue}
        onBlur={this.onBlur}
        {...rest}
      />)
  }
}

const IconTextInputField = styled(TextInput)`
    margin-bottom: 0;

    &.with-icon {
      padding-left: 2.625em;
    }
`

const IconTextInputContainer = styled.div<TextInputProps>`
  position: relative;
  ${props => props.block ? blockCss : 'display: inline-block;'}

  & .text-input-icon {
    position: absolute;
    top: 50%;
    font-size: 1em;
    line-height: 100%;
    margin-top: -0.5em;
    transition: color 0.2s ease-in;
    color: ${props => props.theme.colors.brand};
    left: 1em;
  }

  & .text-input-icon-right {
    right: 1em;
  }
`
