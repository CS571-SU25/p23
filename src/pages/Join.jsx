import { useState } from 'react'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
import { PersonalInfoSection, ExperienceSection, InterestsSection, AdditionalInfoSection } from '../components/FormComponents'
import { PageHeader, SuccessAlert, ProcessSteps, FormFooter } from '../components/UIComponents'

function Join() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experienceLevel: '',
    interests: [],
    previousWork: '',
    motivation: ''
  })
  
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleInterestChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.experienceLevel) newErrors.experienceLevel = 'Please select your experience level'
    if (formData.interests.length === 0) newErrors.interests = 'Please select at least one area of interest'
    if (!formData.motivation.trim()) newErrors.motivation = 'Please tell us why you want to join'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      console.log('Form submitted:', formData)
      setShowSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        experienceLevel: '',
        interests: [],
        previousWork: '',
        motivation: ''
      })
      
      setTimeout(() => {
        setShowSuccess(false)
      }, 10000)
    }
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <PageHeader 
            title="Join Qindeel Filmmaking Club"
            subtitle="Ready to embark on your filmmaking journey? Fill out the form below to express your interest in becoming a member of our creative community."
          />

          <SuccessAlert 
            show={showSuccess} 
            onClose={() => setShowSuccess(false)} 
          />

          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <Form onSubmit={handleSubmit}>
                <PersonalInfoSection 
                  formData={formData}
                  handleInputChange={handleInputChange}
                  errors={errors}
                />
                
                <ExperienceSection 
                  formData={formData}
                  handleInputChange={handleInputChange}
                  errors={errors}
                />
                
                <InterestsSection 
                  formData={formData}
                  handleInterestChange={handleInterestChange}
                  errors={errors}
                />
                
                <AdditionalInfoSection 
                  formData={formData}
                  handleInputChange={handleInputChange}
                  errors={errors}
                />

                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit" size="lg">
                    Submit Application
                  </Button>
                </div>

                <FormFooter />
              </Form>
            </Card.Body>
          </Card>

          <ProcessSteps />
        </Col>
      </Row>
    </Container>
  )
}

export default Join