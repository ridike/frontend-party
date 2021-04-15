import React from 'react'
import styled from 'styled-typed'
import { History, Location } from 'history'
import { TableLoader } from 'components/loaders'
import { DataTable, HeaderRow, DataRow, TableHeader, Cell, Sorting } from 'components/table'
import { Messages, MessageKind } from 'components/messages'
import { ServersInfoService, Server } from './infoService'
import { parseSearch, renderSearch } from 'navigation'
import { PageHeader } from 'components/text'

const ServersPage = styled.div`
  padding: 0 0 3em 0;
  max-width: 960px;
  margin: auto;
`
type SortDirection = 'asc'|'desc'

interface ListProps {
  history: History
  location: Location
  logout: () => void
  serversInfoService: ServersInfoService
}

function List(props: ListProps) {
  const queryItems = parseSearch(props.location.search)
  const [ servers, setServers ] = React.useState<Server[]>([])
  const [ loading, setLoading ] = React.useState<boolean>(true)
  const [ sortBy, setSortBy ] = React.useState<string>(queryItems.sortBy || 'name')
  const [ sortDirection, setSortDirection ] = React.useState<SortDirection>(queryItems.sortDirection as SortDirection || 'desc')
  const [ errorMessageText, setErrorMessageText] = React.useState<string>('')

  React.useEffect(() => {
    async function getServers() {
      try {
        const list = await props.serversInfoService.getServersList()
        setServers(sortBy ? sortServers(list) : list)
      } catch {
        setErrorMessageText('Could not fetch server list. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    getServers()
  }, [])

  const sortServers = (unsortedServers: Server[]): Server[] => {
    let sorted
    if (sortBy === 'name') {
      sorted = [...unsortedServers].sort((a, b) => {
        const a_name = a.name.toUpperCase()
        const b_name = b.name.toUpperCase()
        if (a_name > b_name) {
          return sortDirection === 'asc' ? 1 : -1
        } else if (b_name > a_name) {
          return sortDirection === 'asc' ? -1 : 1
        }
        return 0
      })
    } else {
      sorted = [...unsortedServers].sort((a, b) =>
        sortDirection === 'desc' ? b.distance - a.distance : a.distance - b.distance)
    }
    return sorted
  }

  React.useEffect(() => {
    setServers(sortServers(servers))
  }, [sortBy, sortDirection])

  const onSortChanged = (sorting: Sorting) => {
    const query = renderSearch({ sortBy : sorting.prop, sortDirection : sorting.direction })
    props.history.push(`${props.location.pathname}${query}`)
    setSortBy(sorting.prop)
    setSortDirection(sorting.direction)
  }

  const sort: Sorting = {
    prop: sortBy,
    direction: sortDirection,
  }
  const message = {
    id: 'server_error',
    status: 'error' as MessageKind,
    text: errorMessageText,
    visible: true
  }
  return (
    <ServersPage>
      <Messages
        messages={errorMessageText ? [ message ] : []}
        hideMessage={() => setErrorMessageText('')}
      />
      <PageHeader>Servers list</PageHeader>
      <DataTable columnWidths={[null, '8.75em']}>
        <HeaderRow>
          <TableHeader
            sortKey="name"
            sorting={sort}
            changeSort={onSortChanged}
          >
            Name
          </TableHeader>
          <TableHeader
            sortKey="distance"
            sorting={sort}
            changeSort={onSortChanged}
          >
            Distance
          </TableHeader>
        </HeaderRow>
        {loading && <TableLoader/>}
        {!loading && servers.map((s, i) =>
          <DataRow key={i}>
            <Cell>{s.name}</Cell>
            <Cell>{s.distance}</Cell>
          </DataRow>
        )}
      </DataTable>
    </ServersPage>
  )
}

export default List
