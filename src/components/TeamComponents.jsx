import { Card, Badge, Button, Modal, Row, Col } from 'react-bootstrap'
import { useState } from 'react'

export function TeamMemberCard({ member, onViewProfile }) {
  return (
    <Card className="h-100 shadow-sm border team-card">
      <div className="position-relative">
        <div 
          className="team-photo d-flex align-items-center justify-content-center"
          style={{ height: '200px' }}
        >
          <img 
            src={member.imageUrl} 
            alt={member.name + "'s photo"}
            className="w-100 h-100"
            style={{ objectFit: 'contain' }}
          />
        </div>
        {member.isLeadership && (
          <div className="position-absolute top-0 end-0 m-2">
            <Badge bg="warning" text="dark">★ Leadership</Badge>
          </div>
        )}
      </div>
      
      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-1">{member.name}</Card.Title>
        <Card.Subtitle className="text-primary mb-2">{member.role}</Card.Subtitle>
        
        <div className="mb-2">
          <small className="text-muted">
            <strong>Year:</strong> {member.year} | <strong>Major:</strong> {member.major}
          </small>
        </div>
        
        <div className="mb-3">
          {member.specialties.map((specialty, index) => (
            <Badge key={index} bg="secondary" className="me-1 mb-1">
              {specialty}
            </Badge>
          ))}
        </div>
        
        <Card.Text className="text-muted mb-3 flex-grow-1">
          {member.bio}
        </Card.Text>
        
        <div className="mt-auto">
          <Button 
            variant="outline-primary" 
            size="sm"
            onClick={() => onViewProfile(member)}
            className="w-100"
          >
            View Full Profile
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export function TeamMemberModal({ member, show, onHide }) {
  if (!member) return null

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{member.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={4} className="text-center mb-3">
            <div 
              className="rounded-circle mx-auto mb-3 overflow-hidden"
              style={{ width: '120px', height: '120px' }}
            >
              <img 
                src={member.imageUrl} 
                alt={member.name}
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <h5>{member.name}</h5>
            <p className="text-primary mb-1">{member.role}</p>
            {member.isLeadership && (
              <Badge bg="warning" text="dark">★ Leadership Team</Badge>
            )}
          </Col>
          
          <Col md={8}>
            <div className="mb-3">
              <strong>About {member.name.split(' ')[0]}:</strong>
              <p className="mt-2">{member.fullBio || member.bio}</p>
            </div>
            
            <div className="mb-3">
              <strong>Academic Info:</strong>
              <ul className="mb-0">
                <li><strong>Year:</strong> {member.year}</li>
                <li><strong>Major:</strong> {member.major}</li>
                {member.minor && <li><strong>Minor:</strong> {member.minor}</li>}
              </ul>
            </div>
            
            <div className="mb-3">
              <strong>Specialties:</strong>
              <div className="mt-2">
                {member.specialties.map((specialty, index) => (
                  <Badge key={index} bg="secondary" className="me-1 mb-1">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
            
            {member.achievements && (
              <div className="mb-3">
                <strong>Achievements:</strong>
                <ul className="mt-2">
                  {member.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {member.favoriteFilms && (
              <div className="mb-3">
                <strong>Favorite Films:</strong>
                <p className="mt-1 text-muted">{member.favoriteFilms}</p>
              </div>
            )}
            
            {member.quote && (
              <div className="bg-light p-3 rounded">
                <blockquote className="blockquote mb-0">
                  <p className="mb-0 fst-italic">"{member.quote}"</p>
                </blockquote>
              </div>
            )}
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  )
}

export function TeamStatsCard({ stats }) {
  return (
    <div className="bg-primary text-white p-4 rounded mb-5">
      <h4 className="text-center mb-4">Our Team</h4>
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

export function TeamFilter({ roles, selectedRole, onRoleChange }) {
  return (
    <div className="mb-4">
      <h5>Filter by Role</h5>
      <div className="d-flex flex-wrap gap-2">
        <Button
          variant={selectedRole === 'all' ? 'primary' : 'outline-primary'}
          size="sm"
          onClick={() => onRoleChange('all')}
        >
          All Members
        </Button>
        {roles.map((role) => (
          <Button
            key={role}
            variant={selectedRole === role ? 'primary' : 'outline-primary'}
            size="sm"
            onClick={() => onRoleChange(role)}
          >
            {role}
          </Button>
        ))}
      </div>
    </div>
  )
}

export function LeadershipSection({ leaders, onViewProfile }) {
  return (
    <div className="mb-5">
      <h2 className="text-center mb-4">Leadership Team</h2>
      <Row>
        {leaders.map((leader) => (
          <Col lg={4} md={6} className="mb-4" key={leader.id}>
            <TeamMemberCard 
              member={leader}
              onViewProfile={onViewProfile}
            />
          </Col>
        ))}
      </Row>
    </div>
  )
}