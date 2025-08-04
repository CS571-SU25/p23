import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function Home() {
  return (
    <>
      {}
      <div className="bg-primary text-white py-5 mb-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-4 fw-bold mb-3">
                Welcome to Qindeel Filmmaking Club
              </h1>
              <p className="lead mb-4">
                Join us in our journey of storytelling, collaboration, and hands-on 
                production experience. Where creativity meets cinema.
              </p>
              <LinkContainer to="/join">
                <Button variant="light" size="lg" className="me-3">
                  Join Our Club
                </Button>
              </LinkContainer>
              <LinkContainer to="/films">
                <Button variant="outline-light" size="lg">
                  Watch Our Films
                </Button>
              </LinkContainer>
            </Col>
            <Col lg={6} className="text-center">
              <div className="bg-secondary rounded p-5">
                <h2>🎬</h2>
                <p>Highlight Reel Coming Soon</p>
                <small></small>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {}
      <Container>
        <Row className="mb-5">
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body className="text-center">
                <h3>📅</h3>
                <Card.Title>Upcoming Events</Card.Title>
                <Card.Text>
                  Stay updated with our latest workshops, screenings, and production meetings.
                </Card.Text>
                <Button variant="primary">View Calendar</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body className="text-center">
                <h3>🎥</h3>
                <Card.Title>Latest Productions</Card.Title>
                <Card.Text>
                  Check out our most recent films and behind-the-scenes content.
                </Card.Text>
                <LinkContainer to="/films">
                  <Button variant="primary">Explore Films</Button>
                </LinkContainer>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body className="text-center">
                <h3>👥</h3>
                <Card.Title>Get Involved</Card.Title>
                <Card.Text>
                  Whether you're a beginner or experienced, there's a place for you in our club.
                </Card.Text>
                <LinkContainer to="/projects">
                  <Button variant="primary">Project Board</Button>
                </LinkContainer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Home