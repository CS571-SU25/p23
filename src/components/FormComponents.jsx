import { Form, Row, Col } from 'react-bootstrap'

export function PersonalInfoSection({ formData, handleInputChange, errors }) {
  return (
    <>
      <h4 className="mb-3">Personal Information</h4>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name *</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Email Address *</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      
      <Form.Group className="mb-4">
        <Form.Label>Phone Number (Optional)</Form.Label>
        <Form.Control
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="(123) 456-7890"
        />
      </Form.Group>
    </>
  )
}

export function ExperienceSection({ formData, handleInputChange, errors }) {
  const experienceLevels = [
    { value: 'beginner', label: 'Beginner - New to filmmaking' },
    { value: 'intermediate', label: 'Intermediate - Some experience' },
    { value: 'advanced', label: 'Advanced - Experienced filmmaker' },
    { value: 'professional', label: 'Professional - Industry experience' }
  ]

  return (
    <>
      <h4 className="mb-3">Experience Level</h4>
      <Form.Group className="mb-4">
        {experienceLevels.map((level) => (
          <Form.Check
            key={level.value}
            type="radio"
            id={level.value}
            name="experienceLevel"
            value={level.value}
            label={level.label}
            checked={formData.experienceLevel === level.value}
            onChange={handleInputChange}
            className="mb-2"
          />
        ))}
        {errors.experienceLevel && (
          <div className="text-danger small mt-1">{errors.experienceLevel}</div>
        )}
      </Form.Group>
    </>
  )
}

export function InterestsSection({ formData, handleInterestChange, errors }) {
  const interestAreas = [
    'Directing',
    'Cinematography', 
    'Editing',
    'Sound Design',
    'Screenwriting',
    'Production',
    'Acting',
    'Lighting'
  ]

  return (
    <>
      <h4 className="mb-3">Areas of Interest</h4>
      <Form.Group className="mb-4">
        <Form.Label>What interests you? * <small className="text-muted">(Select all that apply)</small></Form.Label>
        <Row>
          {interestAreas.map((interest) => (
            <Col md={6} key={interest}>
              <Form.Check
                type="checkbox"
                id={interest}
                label={interest}
                checked={formData.interests.includes(interest)}
                onChange={() => handleInterestChange(interest)}
                className="mb-2"
              />
            </Col>
          ))}
        </Row>
        {errors.interests && (
          <div className="text-danger small mt-1">{errors.interests}</div>
        )}
      </Form.Group>
    </>
  )
}

export function AdditionalInfoSection({ formData, handleInputChange, errors }) {
  return (
    <>
      <h4 className="mb-3">Tell Us More</h4>
      <Form.Group className="mb-4">
        <Form.Label>Previous Work or Projects (Optional)</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="previousWork"
          value={formData.previousWork}
          onChange={handleInputChange}
          placeholder="Tell us about any previous filmmaking projects, courses, or related experience..."
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Why do you want to join Qindeel? *</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          name="motivation"
          value={formData.motivation}
          onChange={handleInputChange}
          placeholder="Share your passion for filmmaking and what you hope to gain from joining our club..."
          isInvalid={!!errors.motivation}
        />
        <Form.Control.Feedback type="invalid">
          {errors.motivation}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  )
}