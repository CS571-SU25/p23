import { Alert, Row, Col } from 'react-bootstrap'

export function PageHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-5">
      <h1 className="display-5 fw-bold mb-3">{title}</h1>
      <p className="lead text-muted">{subtitle}</p>
    </div>
  )
}

export function SuccessAlert({ show, onClose }) {
  if (!show) return null
  
  return (
    <Alert variant="success" className="mb-4" dismissible onClose={onClose}>
      <Alert.Heading>🎉 Application Submitted Successfully!</Alert.Heading>
      <p className="mb-0">
        Thank you for your interest! We'll review your application and get back to you within 
        3-5 business days with next steps.
      </p>
    </Alert>
  )
}

export function ProcessSteps() {
  const steps = [
    {
      icon: '📝',
      title: '1. Application Review',
      description: "We'll review your application and interests"
    },
    {
      icon: '🤝',
      title: '2. Welcome Meeting',
      description: 'Join us for an informal meet-and-greet'
    },
    {
      icon: '🎬',
      title: '3. Start Creating',
      description: 'Jump into projects and start filmmaking!'
    }
  ]

  return (
    <div className="mt-5 text-center">
      <h4>What Happens Next?</h4>
      <Row className="mt-4">
        {steps.map((step, index) => (
          <Col md={4} key={index}>
            <div className="mb-3">
              <h5>{step.icon}</h5>
              <h6>{step.title}</h6>
              <small className="text-muted">{step.description}</small>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export function FormFooter() {
  return (
    <div className="text-center mt-3">
      <small className="text-muted">
        * Required fields | We'll get back to you within 3-5 business days
      </small>
    </div>
  )
}