import { History, Location } from 'history'

export interface QueryData {
  [key: string]: string
}

export function parseSearch(qs: string): QueryData {
  if (qs === '' || qs === '?') {
    return {}
  }

  const parts = qs.substr(1).split('&')

  return parts.reduce((q: any, part) => {
    const [k, v] = part.split('=')
    const key = decodeURIComponent(k)
    q[key] = decodeURIComponent(v)
    return q
  }, {})
}

export function renderSearch(q: { [key: string]: string|null|undefined }) {
  return '?' + Object.entries(q)
    .filter(([k, v]) => v !== null && v !== undefined)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v || '')}`)
    .join('&')
}

export class Navigation {
  constructor(private history: History, private location: Location) {}

  query = (): QueryData => {
    return parseSearch(this.location.search)
  }

  addQuery = (q: {[key: string]: string|null|undefined}): void => {
    const prevLocation = this.location
    const prevQuery = parseSearch(prevLocation.search)

    this.history.push({
      pathname: prevLocation.pathname,
      search: renderSearch({ ...prevQuery, ...q })
    })
  }

  addQueryWithReplace = (q: {[key: string]: string|null|undefined}): void => {
    const prevLocation = this.location
    const prevQuery = parseSearch(prevLocation.search)

    this.history.replace({
      pathname: prevLocation.pathname,
      search: renderSearch({ ...prevQuery, ...q })
    })
  }
}
