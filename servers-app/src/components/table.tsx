import * as React from 'react'
import styled, { css } from '../styled-typed'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp, faSortDown, faSort }  from '@fortawesome/free-solid-svg-icons'
import { transparency } from '../css-utils'

export interface Pagination {
  page: number
  pageSize: number
}

interface DataRowProps {
  interactive?: boolean
  hoverBorder?: boolean
  highlighted?: boolean
}

export const HeaderRow = styled.div`
  background: rgba(203,214,226,0.5);

  display: flex;
  border-radius: 0.7em 0.7em 0 0;
`

interface CellProps {
  align?: 'left'|'right'|'center'
  noPadding?: boolean
}

export const Cell = styled.div<CellProps>`
  display: flex;
  justify-content: ${p => {
    if (p.align === 'center') {
      return 'center'
    } else if (p.align === 'right') {
      return 'flex-end'
    } else {
      return 'flex-start'
    }
  }};
  align-items: center;
  flex-shrink: 0;
  padding: ${props => props.noPadding ? '0' : '0 1.25em'};
  font-weight: 300;
  transition: all 0.1s ease-in;

  > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: unset;
  }
`

const dataRowInteractiveCss = css`
  cursor: pointer;
  &:hover ${Cell} {
    font-weight: normal;
  }
`

export const DataRow = styled.div<DataRowProps>`
  display: flex;
  height: 2.5em;
  ${props => props.interactive ? dataRowInteractiveCss : ''}
  transition: all .2s ease-in;

  ${props => props.hoverBorder ?
    ` border-left: 3px solid transparent;
      &:hover {
        border-left: 3px solid ${props.theme.colors.brand};
      }` : ''
  }

  & > * {
    ${props => props.highlighted ? 'opacity: 1' : ''};
    ${props => props.highlighted ? 'font-weight: normal' : ''};
  }
`

export interface Sorting {
  prop: string
  direction: 'asc'|'desc'
}

interface TableHeaderProps {
  children?: any
  sortKey?: string
  sorting?: Sorting
  changeSort?: (newSorting: Sorting) => void
  nonInteractive?: boolean
  noPadding?: boolean
  align?: 'left'|'right'|'center'
}

const activeCss = css`
  color: ${props => props.theme.colors.text};
  font-weight: bold;
`

const inactiveCss = css`
  &:hover {
    color: ${props => props.theme.colors.text};
  }
`

const SortUpIcon = styled(FontAwesomeIcon)`
  margin-left: 0.3125em;
  transform: translateY(17%);
  color: ${props => props.theme.colors.brand};
`

const SortDownIcon = styled(SortUpIcon)`
  transform: translateY(-20%);
`
const SortIcon = styled(SortUpIcon)`
  transform: translateY(-10%);
  color: ${props => props.theme.colors.text};
  opacity: .3;
  transition: opacity 0.1s ease-in;
`

const StyledHeader = styled.div<TableHeaderProps>`
  > span {
    overflow: visible;
  }

  line-height: 100%;
  display: flex;
  justify-content: ${props => {
    if (props.align === 'center') {
      return 'center'
    } else if (props.align === 'right') {
      return 'flex-end'
    } else {
      return 'flex-start'
    }
  }};
  min-height: 1.5em;
  padding: ${props => props.noPadding ? '0' : '.95em 1.25em 0.3em 1.25em'};
  color: ${props => props.theme.colors.textLight};
  ${props => props.sorting
    ? props.sortKey === props.sorting.prop ? activeCss : inactiveCss
    : ''}
  ${props => props.sortKey ? 'cursor: pointer;' : ''}

  white-space: nowrap;
  user-select: none;
  border-bottom: 3px solid transparent;
  transition: color 0.1s ease-in, border-bottom 0.2s ease-in;

  ${props => !props.nonInteractive ? css`
    &:hover {
      border-bottom: 3px solid ${props.theme.colors.brand};
    }

    &:hover ${SortIcon} {
      opacity: .8;
    }
  ` : ''}
`

const StyledHeaderText = styled.span`
  display: flex;
  justify-content: flex-start;
`

function newSorting(sortKey: string, sorting: Sorting): Sorting {
  const direction = sorting.prop === sortKey
    ? sorting.direction === 'asc' ? 'desc' : 'asc'
    : 'asc'
  return { prop: sortKey, direction }
}

export function TableHeader(
  {
    children,
    sortKey,
    sorting,
    changeSort,
    align,
    ...rest
  }: TableHeaderProps & React.HTMLAttributes<HTMLTableHeaderCellElement>
) {
  const sortDirection = sorting && sorting.prop === sortKey ? sorting.direction : null
  return (
    <StyledHeader
      sortKey={sortKey}
      sorting={sorting}
      align={align}
      onClick={() => changeSort && sortKey && sorting && changeSort(newSorting(sortKey, sorting))}
      {...rest}
    >
      <StyledHeaderText>
        {children}
        {sortDirection === 'asc' && <SortUpIcon icon={faSortUp} />}
        {sortDirection === 'desc' && <SortDownIcon icon={faSortDown} />}
        {children && !sortDirection && sortKey && <SortIcon icon={faSort} />}
      </StyledHeaderText>
    </StyledHeader>
  )
}

interface DataTableProps {
  id?: string
  style?: React.CSSProperties
  className?: string
  columnWidths?: (string|null)[]
  columnData?: {w: string|null, fixed: boolean}[]
  children?: React.ReactNode
  bordered?: boolean
  customSidePadding?: string
  noPadding?: boolean
  allowOverflow?: boolean
  rightInsetShadow?: boolean
}

export const DataTable = styled.div<DataTableProps>`
  width: ${props => props.allowOverflow ? 'fit-content' : '100%'};
  box-shadow: ${props => props.allowOverflow ? '' : '0 5px 10px 0 rgba(57,73,84,0.15)'};

  & ${HeaderRow} > ${StyledHeader} {
    -ms-flex-negative: 1;
    flex: 1 1 0;
    ${props => props.customSidePadding ?
      `padding: .95em ${props.customSidePadding} 0.3em ${props.customSidePadding}` : ''}
    ${props => props.noPadding ? 'padding: .95em 0 0.3em 0' : ''}
  }

  & ${DataRow} > ${Cell} {
    -ms-flex-negative: 1;
    flex: 1 1 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    ${props => props.customSidePadding ? `padding: ${props.customSidePadding} ${props.customSidePadding}` : ''}
    ${props => props.noPadding ? 'padding: 0 0' : ''}
  }

  & ${DataRow} > ${Cell}.overflow-allowed {
    overflow: visible;
  }

  & > ${DataRow}:nth-child(2n){
    background: ${props => transparency(props.theme.colors.background, 0.5)};
  }

  & > ${DataRow}:nth-child(2n + 1){
    background: ${props => transparency('#F8F9FB', 0.5)};
  }

  ${props => (props.columnWidths || []).map((w, i) => w ? css`
    & ${HeaderRow} > ${StyledHeader}:nth-child(${i + 1}),
    & ${DataRow} > ${Cell}:nth-child(${i + 1}) {
      width: ${w};
      max-width: ${w};
      min-width: ${w};
      /* Edge */
      @supports (-ms-ime-align:auto) {
        min-width: ${w};
      }
    }
  ` : '')}

  ${props => (props.columnData || []).map((c, i) => c ? css`
    & ${HeaderRow} > ${StyledHeader}:nth-child(${i + 1}),
    & ${DataRow} > ${Cell}:nth-child(${i + 1}) {
      width: ${c.w};
      max-width: ${c.fixed ? c.w : 'unset'};
      min-width: ${c.w};
      /* Edge */
      @supports (-ms-ime-align:auto) {
        min-width: ${c.w};
      }
    }
  ` : '')}

  ${props => props.bordered ?
    `${DataRow} {
      border-bottom: 1px solid ${transparency('#CBD6E2', 0.5)};
    }`
    : ''
  }
`
