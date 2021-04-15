import * as React from 'react'
import styled, { keyframes } from 'styled-typed'
import { DataRow, Cell } from 'components/table'
import LoaderGif from './loader.gif'

const FadeInAnimation = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const Loader = styled.img`
  animation: ${FadeInAnimation} 0.1s ease-in;
`

const LoaderRow = styled(DataRow)`
  height: unset;
  justify-content: center;
`

export function TableLoader({ style }: { style?: React.CSSProperties}) {
  return (
    <LoaderRow style={style}>
      <Cell align="center" style={{width: '7em', maxWidth: '7em'}}>
        <div style={{ textAlign: 'center' }}>
          <Loader src={LoaderGif} style={{ width: '7em' }} />
        </div>
      </Cell>
    </LoaderRow>
  )
}
