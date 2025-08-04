import { Card, Row, Col, Badge, ProgressBar } from 'react-bootstrap'

export function MissionVisionCard({ title, icon, children }) {
  return (
    <Card className="h-100 shadow-sm border">
      <Card.Body className="p-4">
        <div className="text-center mb-3">
          <h2 className="text-primary">{icon}</h2>
          <h3>{title}</h3>
        </div>
        {children}
      </Card.Body>
    </Card>
  )
}

export function ValueCard({ value }) {
  return (
    <Card className="h-100 shadow-sm border hover-card">
      <Card.Body className="text-center p-4">
        <div className="mb-3">
          <h2>{value.icon}</h2>
          <h5>{value.title}</h5>
        </div>
        <Card.Text className="text-muted">
          {value.description}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export function StatsCard({ stats }) {
  return (
    <div className="bg-primary text-white p-4 rounded">
      <h4 className="text-center mb-4">Qindeel by the Numbers</h4>
      <Row className="text-center">
        {stats.map((stat, index) => (
          <Col md={3} key={index} className="mb-3">
            <h3 className="mb-1">{stat.number}</h3>
            <small>{stat.label}</small>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export function TimelineCard({ event }) {
  return (
    <div className="timeline-item mb-4">
      <div className="row align-items-center">
        <div className="col-md-3 text-md-end">
          <Badge bg="primary" className="px-3 py-2">
            {event.date}
          </Badge>
        </div>
        <div className="col-md-1 text-center">
          <div className="timeline-dot bg-primary"></div>
        </div>
        <div className="col-md-8">
          <Card className="shadow-sm border">
            <Card.Body>
              <h6 className="mb-2">{event.title}</h6>
              <Card.Text className="text-muted mb-0">
                {event.description}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}

export function SkillProgressCard({ skills }) {
  return (
    <Card className="shadow-sm border">
      <Card.Header className="bg-light">
        <h5 className="mb-0">🎓 Skills You'll Develop</h5>
      </Card.Header>
      <Card.Body>
        {skills.map((skill, index) => (
          <div key={index} className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <small><strong>{skill.name}</strong></small>
              <small className="text-muted">{skill.level}</small>
            </div>
            <ProgressBar 
              now={skill.progress} 
              variant={skill.progress >= 80 ? 'success' : skill.progress >= 60 ? 'info' : 'warning'}
              style={{ height: '8px' }}
            />
          </div>
        ))}
      </Card.Body>
    </Card>
  )
}

export function QuoteCard({ quote }) {
  return (
    <Card className="shadow-sm border bg-light">
      <Card.Body className="text-center p-4">
        <blockquote className="blockquote mb-3">
          <p className="mb-0 fs-5 fst-italic">"{quote.text}"</p>
        </blockquote>
        <div className="d-flex align-items-center justify-content-center">
          <div 
            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
            style={{ width: '50px', height: '50px' }}
          >
            {quote.author.charAt(0)}
          </div>
          <div className="text-start">
            <h6 className="mb-0">{quote.author}</h6>
            <small className="text-muted">{quote.role}</small>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}