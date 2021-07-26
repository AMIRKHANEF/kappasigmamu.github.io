import { useReducer } from 'react'
import { Button } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { default as BNavbar } from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import { reducer, INIT_STATE, loadAccounts } from '../../substrate'
import DiscordLogo from './discord-logo.svg'
import KappaSigmaMu from './kappa-sigma-mu-logo.svg'
import TwitterLogo from './twitter-logo.svg'

function Navbar() {
  const [state, dispatch] = useReducer(reducer, INIT_STATE)

  return (
    <BNavbar bg="dark" variant="dark">
      <Container>
        <BNavbar.Brand as={Link} to="/">
          <img src={KappaSigmaMu} alt="KappaSigmaMu Logo" />
        </BNavbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>
          <Nav.Link as={Link} to="/intro">
            Intro
          </Nav.Link>
        </Nav>
        <Nav>
          <BNavbar.Brand href="https://discord.gg/9AWjTf8wSk" target="_blank">
            <img src={DiscordLogo} alt="Discord Logo" />
          </BNavbar.Brand>
          <BNavbar.Brand href="https://twitter.com/network" target="_blank">
            <img src={TwitterLogo} alt="Twitter Logo" />
          </BNavbar.Brand>
          <Button onClick={() => loadAccounts(state, dispatch)}>
            Connect Wallet
          </Button>
        </Nav>
      </Container>
    </BNavbar>
  )
}

export { Navbar }
