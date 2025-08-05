import { useState } from 'react'
import { Container, Row, Col, Alert } from 'react-bootstrap'
import { ProjectCard, RoleApplicationModal, ProjectDetailsModal, ProjectStatusFilter } from '../components/ProjectComponents'
import { PageHeader, SuccessAlert } from '../components/UIComponents'

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showApplicationModal, setShowApplicationModal] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showApplicationSuccess, setShowApplicationSuccess] = useState(false)

  const mockProjects = [
    {
      id: 1,
      title: "Midnight Campus",
      description: "A psychological thriller set on campus during finals week, exploring student stress and mental health.",
      fullDescription: "Midnight Campus is an ambitious short film that delves into the psychological pressures faced by college students during finals week. Through the lens of horror and suspense, we'll explore themes of academic pressure, mental health, and the support systems that help students survive their most challenging moments. The film requires a dedicated team willing to work with night shoots and emotionally complex material.",
      director: "Alex Rivera",
      genre: "Thriller/Drama",
      status: "Pre-Production",
      timeline: "Feb - May 2025",
      progress: 25,
      openRoles: [
        {
          title: "Cinematographer",
          description: "Lead camera work for night shoots and psychological sequences",
          urgent: true,
          requirements: ["Experience with low-light filming", "Own camera equipment preferred", "Available for night shoots"]
        },
        {
          title: "Sound Designer",
          description: "Create atmospheric sound design and manage on-set audio",
          urgent: false,
          requirements: ["Experience with audio editing software", "Understanding of horror/thriller sound design"]
        },
        {
          title: "Lead Actor",
          description: "Play the main character - a stressed college student",
          urgent: true,
          requirements: ["Acting experience preferred", "Comfortable with psychological themes", "Must be available for most shoot days"]
        },
        {
          title: "Makeup Artist",
          description: "Create realistic student looks and some special effects makeup",
          urgent: false,
          requirements: ["Basic makeup skills", "Interest in learning special effects"]
        }
      ]
    },
    {
      id: 2,
      title: "Local Heroes",
      description: "A documentary celebrating unsung heroes in our community - local business owners, volunteers, and everyday champions.",
      fullDescription: "Local Heroes aims to shine a spotlight on the remarkable individuals who make our community special. From the corner store owner who knows everyone's name to the volunteer who organizes neighborhood cleanups, this documentary will capture heartwarming stories of everyday people making extraordinary contributions. We're looking for passionate storytellers who want to celebrate the positive impact of community connections.",
      director: "Maria Santos",
      genre: "Documentary",
      status: "In Production",
      timeline: "Jan - April 2025",
      progress: 60,
      openRoles: [
        {
          title: "Interview Coordinator",
          description: "Schedule and coordinate interviews with community members",
          urgent: false,
          requirements: ["Strong communication skills", "Organized and detail-oriented", "Experience with scheduling preferred"]
        },
        {
          title: "B-Roll Cameraman",
          description: "Capture supplementary footage of community locations and events",
          urgent: false,
          requirements: ["Basic camera skills", "Own transportation", "Flexible schedule"]
        }
      ]
    },
    {
      id: 3,
      title: "The Art of Silence",
      description: "An experimental film exploring communication through visual storytelling, with minimal dialogue.",
      fullDescription: "The Art of Silence is an experimental short film that challenges conventional narrative structure by telling a complete story through visual elements, body language, and minimal dialogue. The project explores themes of connection, isolation, and the power of non-verbal communication. This is an excellent opportunity for creative individuals who want to push the boundaries of traditional filmmaking and experiment with innovative storytelling techniques.",
      director: "Jordan Kim",
      genre: "Experimental",
      status: "Pre-Production",
      timeline: "March - June 2025",
      progress: 15,
      openRoles: [
        {
          title: "Creative Collaborator",
          description: "Work closely with director on visual storytelling and experimental techniques",
          urgent: true,
          requirements: ["Creative vision", "Interest in experimental film", "Collaborative mindset"]
        },
        {
          title: "Movement Coach",
          description: "Help actors develop physical storytelling and body language",
          urgent: false,
          requirements: ["Dance, theater, or movement background", "Experience working with actors"]
        },
        {
          title: "Color Grader",
          description: "Post-production color correction and creative color grading",
          urgent: false,
          requirements: ["Experience with color grading software", "Understanding of visual mood and tone"]
        }
      ]
    },
    {
      id: 4,
      title: "Recipe for Disaster",
      description: "A comedy short about a cooking show that goes hilariously wrong when everything that can go wrong, does.",
      fullDescription: "Recipe for Disaster is a lighthearted comedy that follows an overly ambitious cooking show host as their supposedly simple recipe demonstration turns into complete chaos. From kitchen fires to ingredient mix-ups, this fast-paced comedy requires precise timing and physical comedy skills. Perfect for team members who want to work on something fun and energetic while learning about comedy timing and practical effects.",
      director: "Sam Phillips",
      genre: "Comedy",
      status: "In Production",
      timeline: "Dec 2024 - March 2025",
      progress: 75,
      openRoles: [
        {
          title: "Props Master",
          description: "Manage cooking equipment and practical effect props for comedy scenes",
          urgent: true,
          requirements: ["Organized and detail-oriented", "Creative problem-solving", "Available for shoot days"]
        },
        {
          title: "Script Supervisor",
          description: "Ensure continuity during complex comedy sequences",
          urgent: false,
          requirements: ["Attention to detail", "Understanding of script supervision", "Good note-taking skills"]
        }
      ]
    },
    {
      id: 5,
      title: "Digital Divide",
      description: "A thought-provoking short about technology's impact on human relationships and digital natives vs. digital immigrants.",
      fullDescription: "Digital Divide explores the generational gap in technology adoption and its impact on family relationships. The story follows three generations of the same family as they navigate everything from video calls with grandparents to social media conflicts. This contemporary drama addresses relevant themes about connection, communication, and finding balance in our digital age.",
      director: "Casey Brown",
      genre: "Drama",
      status: "Post-Production",
      timeline: "Sep 2024 - Feb 2025",
      progress: 90,
      openRoles: [
        {
          title: "Motion Graphics Artist",
          description: "Create digital interface animations and screen graphics",
          urgent: true,
          requirements: ["After Effects or similar software experience", "Understanding of UI/UX design", "Quick turnaround capability"]
        }
      ]
    },
    {
      id: 6,
      title: "The Last Bookstore",
      description: "A nostalgic piece about a family-owned bookstore's final days and the community it served for decades.",
      fullDescription: "The Last Bookstore is a bittersweet documentary-style narrative about the closing of a beloved independent bookstore. Through interviews with customers, employees, and the owner's family, we'll explore themes of community, tradition, and adaptation in the digital age. This project combines documentary techniques with narrative storytelling to create a deeply personal and universally relatable story about change and loss.",
      director: "Taylor Rodriguez",
      genre: "Drama/Documentary",
      status: "Completed",
      timeline: "Completed Jan 2025",
      progress: 100,
      openRoles: []
    }
  ]

  const statuses = [...new Set(mockProjects.map(project => project.status))]
  
  const filteredProjects = selectedStatus === 'all' 
    ? mockProjects 
    : mockProjects.filter(project => project.status === selectedStatus)

  const activeProjects = mockProjects.filter(p => p.status !== 'Completed')
  const totalOpenRoles = activeProjects.reduce((sum, project) => sum + project.openRoles.length, 0)
  const urgentRoles = activeProjects.reduce((sum, project) => 
    sum + project.openRoles.filter(role => role.urgent).length, 0)

  const handleViewDetails = (project) => {
    setSelectedProject(project)
    setShowDetailsModal(true)
  }

  const handleApplyRole = (project) => {
    setSelectedProject(project)
    setShowApplicationModal(true)
  }

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false)
    setSelectedProject(null)
  }

  const handleCloseApplicationModal = () => {
    setShowApplicationModal(false)
    setSelectedProject(null)
  }

  const handleSubmitApplication = (applicationData) => {
    console.log('Application submitted:', applicationData)
    setShowApplicationSuccess(true)
    setTimeout(() => setShowApplicationSuccess(false), 5000)
  }

  return (
    <Container className="py-5">
      <PageHeader 
        title="Project Board"
        subtitle="Discover current film projects and find your perfect role in our creative community. From pre-production to post-production, there's a place for every skill level."
      />

      <SuccessAlert 
        show={showApplicationSuccess}
        onClose={() => setShowApplicationSuccess(false)}
      />

      <div className="mb-4 p-4 bg-light rounded">
        <Row className="text-center">
          <Col md={3}>
            <h4 className="text-primary mb-0">{activeProjects.length}</h4>
            <small className="text-muted">Active Projects</small>
          </Col>
          <Col md={3}>
            <h4 className="text-success mb-0">{totalOpenRoles}</h4>
            <small className="text-muted">Open Roles</small>
          </Col>
          <Col md={3}>
            <h4 className="text-warning mb-0">{urgentRoles}</h4>
            <small className="text-muted">Urgent Roles</small>
          </Col>
          <Col md={3}>
            <h4 className="text-info mb-0">{mockProjects.filter(p => p.status === 'Completed').length}</h4>
            <small className="text-muted">Completed</small>
          </Col>
        </Row>
      </div>

      {urgentRoles > 0 && (
        <Alert variant="warning" className="mb-4">
          <Alert.Heading>🔥 Urgent Roles Available!</Alert.Heading>
          <p className="mb-0">
            We have {urgentRoles} urgent roles that need to be filled soon. 
            Check out the projects below and apply today!
          </p>
        </Alert>
      )}

      <ProjectStatusFilter 
        statuses={statuses}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      <Row>
        {filteredProjects.map((project) => (
          <Col lg={6} className="mb-4" key={project.id}>
            <ProjectCard 
              project={project}
              onViewDetails={handleViewDetails}
              onApplyRole={handleApplyRole}
            />
          </Col>
        ))}
      </Row>

      {filteredProjects.length === 0 && (
        <div className="text-center py-5">
          <h4 className="text-muted">No projects found</h4>
          <p className="text-muted">Try selecting a different status filter.</p>
        </div>
      )}

      <ProjectDetailsModal 
        project={selectedProject}
        show={showDetailsModal}
        onHide={handleCloseDetailsModal}
        onApplyRole={handleApplyRole}
      />

      <RoleApplicationModal 
        project={selectedProject}
        show={showApplicationModal}
        onHide={handleCloseApplicationModal}
        onSubmitApplication={handleSubmitApplication}
      />

      <div className="mt-5 text-center">
        <div className="bg-primary text-white p-4 rounded">
          <h4>Have an idea for a new project?</h4>
          <p className="mb-3">
            Qindeel members can propose and lead their own film projects. 
            Submit your concept and recruit your team through the project board.
          </p>
          <a href="#/join" className="btn btn-light btn-lg" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            Learn More About Leadership Opportunities
          </a>
        </div>
      </div>
    </Container>
  )
}

export default Projects