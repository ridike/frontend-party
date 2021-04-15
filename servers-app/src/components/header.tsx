import styled from 'styled-typed'
import { History } from 'history'

interface HeaderProps {
  logout: () => void
  history: History
}

const HeaderContainer = styled.div`
  flex: 0 0 50px;
  padding: 0 30px;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: ${p => p.theme.colors.primary};
`

const LogoutLink = styled.a`
  color: #FFFFFF;
  font-size: .75em;
  text-decoration: none;
  &:hover {
    font-weight: 600;
  }
`

export function Header(p: HeaderProps) {
  return (
    <HeaderContainer id="header">
      <div></div>
      <LogoutLink href="/login" onClick={p.logout}>Logout</LogoutLink>
    </HeaderContainer>
  )
}
