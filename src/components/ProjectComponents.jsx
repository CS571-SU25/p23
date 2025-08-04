import { Card, Badge, Button, ProgressBar, Modal, Form, Row, Col } from 'react-bootstrap'
import { useState } from 'react'

export function ProjectCard({ project, onApplyRole, onViewDetails }) {
  const getStatusVariant = (status) => {
    switch (status) {
      case 'Pre-Production': return 'warning'
      case 'In Production': return 'primary'
      case 'Post-Production': return 'info'
      case 'Completed': return 'success'
      default: return 'secondary'
    }
  }

  const urgentRoles = project.openRoles.filter(role => role.urgent)

  return (
    <Card className="h-100 shadow-sm project-card">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <Card.Title className="mb-0">{project.title}</Card.Title>
          <Badge bg={getStatusVariant(project.status)} className="ms-2">
            {project.status}
          </Badge>
        </div>

        <Card.Text className="text-muted mb-3">
          {project.description}
        </Card.Text>

        <div className="mb-3">
          <small className="text-muted d-block">
            <strong>Director:</strong> {project.director}
          </small>
          <small className="text-muted d-block">
            <strong>Genre:</strong> {project.genre}
          </small>
          <small className="text-muted d-block">
            <strong>Timeline:</strong> {project.timeline}
          </small>
        </div>

        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <small><strong>Progress</strong></small>
            <small>{project.progress}%</small>
          </div>
          <ProgressBar now={project.progress} style={{ height: '8px' }} />
        </div>

        {urgentRoles.length > 0 && (
          <div className="mb-3">
            <Badge bg="danger" className="mb-2">
              🔥 Urgent Roles Needed
            </Badge>
            <div>
              {urgentRoles.map((role, index) => (
                <Badge key={index} bg="outline-danger" className="me-1 mb-1">
                  {role.title}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="mb-3">
          <strong>Open Roles ({project.openRoles.length}):</strong>
          <div className="mt-1">
            {project.openRoles.slice(0, 3).map((role, index) => (
              <Badge key={index} bg="secondary" className="me-1 mb-1">
                {role.title}
              </Badge>
            ))}
            {project.openRoles.length > 3 && (
              <Badge bg="light" text="dark">
                +{project.openRoles.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        <div className="d-flex gap-2">
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => onViewDetails(project)}
          >
            View Details
          </Button>
          <Button 
            variant="outline-primary" 
            size="sm"
            onClick={() => onApplyRole(project)}
            disabled={project.openRoles.length === 0}
          >
            Apply to Join
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export function RoleApplicationModal({ project, show, onHide, onSubmitApplication }) {
  const [selectedRole, setSelectedRole] = useState('')
  const [applicationData, setApplicationData] = useState({
    experience: '',
    portfolio: '',
    availability: '',
    motivation: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setApplicationData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedRole && applicationData.motivation.trim()) {
      onSubmitApplication({
        projectId: project?.id,
        role: selectedRole,
        ...applicationData
      })
      setSelectedRole('')
      setApplicationData({
        experience: '',
        portfolio: '',
        availability: '',
        motivation: ''
      })
      onHide()
    }
  }

  if (!project) return null

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Apply for "{project.title}"</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Select Role *</Form.Label>
            <Form.Select 
              value={selectedRole} 
              onChange={(e) => setSelectedRole(e.target.value)}
              required
            >
              <option value="">Choose a role...</option>
              {project.openRoles.map((role, index) => (
                <option key={index} value={role.title}>
                  {role.title} {role.urgent ? '🔥 URGENT' : ''}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {selectedRole && (
            <div className="mb-3 p-3 bg-light rounded">
              <h6>Role Details:</h6>
              {project.openRoles.find(r => r.title === selectedRole)?.description}
            </div>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Relevant Experience</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="experience"
              value={applicationData.experience}
              onChange={handleInputChange}
              placeholder="Describe your relevant experience for this role..."
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Portfolio/Work Samples (Optional)</Form.Label>
            <Form.Control
              type="text"
              name="portfolio"
              value={applicationData.portfolio}
              onChange={handleInputChange}
              placeholder="Link to your work, portfolio, or relevant samples..."
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Availability</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="availability"
              value={applicationData.availability}
              onChange={handleInputChange}
              placeholder="When are you available to work on this project?"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Why do you want this role? *</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="motivation"
              value={applicationData.motivation}
              onChange={handleInputChange}
              placeholder="Tell us why you're interested in this role and what you hope to contribute..."
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Submit Application
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export function ProjectDetailsModal({ project, show, onHide, onApplyRole }) {
  if (!project) return null

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{project.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <Badge bg="primary" className="me-2">{project.status}</Badge>
          <Badge bg="secondary">{project.genre}</Badge>
        </div>

        <p><strong>Director:</strong> {project.director}</p>
        <p><strong>Timeline:</strong> {project.timeline}</p>
        <p><strong>Description:</strong></p>
        <p>{project.fullDescription || project.description}</p>

        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6>Project Progress</h6>
            <span>{project.progress}%</span>
          </div>
          <ProgressBar now={project.progress} />
        </div>

        <h6>Open Roles:</h6>
        <Row>
          {project.openRoles.map((role, index) => (
            <Col md={6} key={index} className="mb-3">
              <Card className="h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title className="h6 mb-0">{role.title}</Card.Title>
                    {role.urgent && <Badge bg="danger">Urgent</Badge>}
                  </div>
                  <Card.Text className="small text-muted">
                    {role.description}
                  </Card.Text>
                  {role.requirements && (
                    <div>
                      <small><strong>Requirements:</strong></small>
                      <ul className="small mb-0">
                        {role.requirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="d-flex justify-content-end mt-3">
          <Button variant="primary" onClick={() => onApplyRole(project)}>
            Apply for a Role
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export function ProjectStatusFilter({ statuses, selectedStatus, onStatusChange }) {
  return (
    <div className="mb-4">
      <h5>Filter by Status</h5>
      <div className="d-flex flex-wrap gap-2">
        <Button
          variant={selectedStatus === 'all' ? 'primary' : 'outline-primary'}
          size="sm"
          onClick={() => onStatusChange('all')}
        >
          All Projects
        </Button>
        {statuses.map((status) => (
          <Button
            key={status}
            variant={selectedStatus === status ? 'primary' : 'outline-primary'}
            size="sm"
            onClick={() => onStatusChange(status)}
          >
            {status}
          </Button>
        ))}
      </div>
    </div>
  )
}