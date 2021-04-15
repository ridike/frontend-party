import styled from 'styled-typed'

const gutter = 30
const gridSize = 12

export interface ColProps {
  span?: number
  offset?: number
}

export const Col = styled.div<ColProps>`
  ${props => {
    const value = 100 * (props.span || 1) / gridSize
    return `
      flex-basis: ${value}%;
      max-width: ${value}%;
    `
  }}

  margin-left: ${props => 100 / gridSize * (props.offset || 0)}%;
  ${props => props.span === 12 ?
    'padding: 0 0 !important;'
    : ''
  }
`

export interface RowProps {
  gutter?: number
}

export const Row = styled.div<RowProps>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 0 1 auto;

  & > ${Col} {
    padding: 0 ${props => (props.gutter || gutter) / 2}px;
  }

  & > ${Col}:first-child {
    padding-left: 0;
  }

  & > ${Col}:last-child {
    padding-right: 0;
  }
`
