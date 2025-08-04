import { Navbar, Nav, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function Navigation() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <strong>Qindeel</strong> Filmmaking Club
          </Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About Us</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/team">
              <Nav.Link>Meet the Team</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/films">
              <Nav.Link>Our Films</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/join">
              <Nav.Link>Join Us</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/projects">
              <Nav.Link>Project Board</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/feedback">
              <Nav.Link>Feedback Wall</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation