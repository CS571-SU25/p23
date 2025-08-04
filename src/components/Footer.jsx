import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row>
          <Col md={6}>
            <h5>Qindeel Filmmaking Club</h5>
            <p className="mb-0">
              Dedicated to storytelling, collaboration, and hands-on production experience.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <div className="mb-2">
              <small>Follow us on social media:</small>
            </div>
            <div>
              <span className="me-3">📧 qindeel@example.com</span>
              <span className="me-3">📱 @QindeelFilms</span>
              <span>🎬 YouTube</span>
            </div>
          </Col>
        </Row>
        <hr className="my-3" />
        <Row>
          <Col className="text-center">
            <small>
              © 2025 Qindeel Filmmaking Club. All rights reserved. | 
              <span className="ms-1">Built with React & Bootstrap</span>
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer