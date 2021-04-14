import React from 'react'
import styled from '../styled-typed'
import { History, Location } from 'history'
import { DataTable, HeaderRow, DataRow, TableHeader, Cell, Sorting } from '../components/table'
import { ServersInfoService, Server } from './infoService'
import { parseSearch, renderSearch } from '../navigation'
import { PageHeader } from '../components/text'

const ServersPage = styled.div`
  padding: 0 0 3em 0;
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
  const [ sortBy, setSortBy ] = React.useState<string>(queryItems.sortBy || 'name')
  const [ sortDirection, setSortDirection ] = React.useState<SortDirection>(queryItems.sortDirection as SortDirection || 'desc')

  React.useEffect(() => {
    async function getServers() {
      try {
        const list = await props.serversInfoService.getServersList()
        setServers(sortBy ? sortServers(list) : list)
      } catch {
        // todo display messaage
        alert('could not fetch server list')
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
  return (
    <ServersPage>
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
        {servers.map((s, i) =>
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
