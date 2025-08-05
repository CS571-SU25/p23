import { Container, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { PageHeader } from '../components/UIComponents'
import { MissionVisionCard, ValueCard, StatsCard, TimelineCard, SkillProgressCard, QuoteCard } from '../components/AboutComponents'

function About() {
  const clubValues = [
    {
      icon: "🤝",
      title: "Collaboration",
      description: "We believe the best films come from diverse perspectives and shared creativity. Every project is a team effort."
    },
    {
      icon: "🎓",
      title: "Learning",
      description: "From beginners to experts, we're all students. We foster an environment of continuous growth and skill development."
    },
    {
      icon: "🌟",
      title: "Innovation",
      description: "We encourage experimental approaches and creative risk-taking to push the boundaries of storytelling."
    },
    {
      icon: "🌍",
      title: "Inclusivity",
      description: "Our club welcomes filmmakers from all backgrounds, experiences, and perspectives. Every voice matters."
    }
  ]

  const clubStats = [
    { number: "50+", label: "Active Members" },
    { number: "25", label: "Films Produced" },
    { number: "3", label: "Years Running" },
    { number: "12", label: "Awards Won" }
  ]

  const timeline = [
    {
      date: "Fall 2022",
      title: "Club Founded",
      description: "Qindeel Filmmaking Club was founded by a group of passionate film students who wanted to create a supportive community for storytellers."
    },
    {
      date: "Spring 2023",
      title: "First Film Festival",
      description: "Organized our first internal film festival, showcasing 8 student films to an audience of 200+ attendees."
    },
    {
      date: "Fall 2023",
      title: "Equipment Expansion",
      description: "Secured funding for professional cameras, lighting equipment, and editing software, enhancing our production capabilities."
    },
    {
      date: "Spring 2024",
      title: "Community Partnerships",
      description: "Established partnerships with local theaters and film organizations, expanding our screening and networking opportunities."
    },
    {
      date: "Fall 2024",
      title: "Award Recognition",
      description: "Our films won multiple awards at regional student film festivals, gaining recognition for our club's quality work."
    },
    {
      date: "Present",
      title: "Continued Growth",
      description: "Today, we continue to grow our community, mentor new filmmakers, and create impactful cinematic stories."
    }
  ]

  const skills = [
    { name: "Video Production", progress: 85, level: "Advanced" },
    { name: "Storytelling", progress: 90, level: "Expert" },
    { name: "Post-Production", progress: 75, level: "Advanced" },
    { name: "Sound Design", progress: 65, level: "Intermediate" },
    { name: "Project Management", progress: 80, level: "Advanced" },
    { name: "Collaboration", progress: 95, level: "Expert" }
  ]

  const testimonials = [
    {
      text: "Joining Qindeel was the best decision I made in college. I went from knowing nothing about filmmaking to directing my own short film in just one semester.",
      author: "Sarah Chen",
      role: "Former President, Class of 2024"
    },
    {
      text: "The supportive environment at Qindeel helped me find my passion for cinematography. The mentorship and hands-on experience were invaluable.",
      author: "Marcus Rodriguez",
      role: "Current Vice President"
    },
    {
      text: "What I love most about Qindeel is how it brings together people from all different majors and backgrounds, united by our love for storytelling.",
      author: "Elena Vasquez",
      role: "Active Member since 2023"
    }
  ]

  return (
    <>
      <div className="bg-light py-5 mb-5">
        <Container>
          <PageHeader 
            title="About Qindeel Filmmaking Club"
            subtitle="A student-led filmmaking club dedicated to storytelling, collaboration, and hands-on production experience at the heart of our creative community."
          />
        </Container>
      </div>

      <Container>
        <Row className="mb-5">
          <Col lg={6} className="mb-4">
            <MissionVisionCard title="Our Mission" icon="🎯">
              <p>
                To foster a vibrant community of storytellers and filmmakers who support 
                each other in creating meaningful, impactful cinema. We believe that every 
                story matters and every voice deserves to be heard through the powerful 
                medium of film.
              </p>
              <p>
                Through collaborative projects, educational workshops, and creative 
                exploration, we empower our members to develop their unique artistic 
                vision while building practical filmmaking skills.
              </p>
            </MissionVisionCard>
          </Col>
          
          <Col lg={6} className="mb-4">
            <MissionVisionCard title="Our Vision" icon="👁️">
              <p>
                To become the premier filmmaking community that bridges the gap between 
                academic learning and real-world production experience. We envision a 
                future where our members are confident, skilled filmmakers ready to 
                make their mark in the industry.
              </p>
              <p>
                We strive to create an inclusive environment where creativity flourishes, 
                diverse perspectives are celebrated, and every member feels empowered to 
                tell their unique story.
              </p>
            </MissionVisionCard>
          </Col>
        </Row>

        <div className="mb-5">
          <StatsCard stats={clubStats} />
        </div>

        <Row className="mb-5">
          <Col>
            <h2 className="text-center mb-4">Our Core Values</h2>
            <Row>
              {clubValues.map((value, index) => (
                <Col lg={3} md={6} className="mb-4" key={index}>
                  <ValueCard value={value} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col lg={8}>
            <h2 className="mb-4">Our Journey</h2>
            <div className="timeline">
              {timeline.map((event, index) => (
                <TimelineCard key={index} event={event} />
              ))}
            </div>
          </Col>
          <Col lg={4}>
            <SkillProgressCard skills={skills} />
          </Col>
        </Row>

        <Row className="mb-5">
          <Col>
            <h2 className="text-center mb-4">What Our Members Say</h2>
            <Row>
              {testimonials.map((quote, index) => (
                <Col lg={4} className="mb-4" key={index}>
                  <QuoteCard quote={quote} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        <div className="text-center mb-5">
          <div className="bg-gradient p-5 rounded text-white" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <h3>Ready to Start Your Filmmaking Journey?</h3>
            <p className="lead mb-4">
              Join a community of passionate storytellers and bring your creative vision to life. 
              Whether you're a complete beginner or an experienced filmmaker, there's a place for you at Qindeel.
            </p>
            <div className="d-flex gap-3 justify-content-center">
              <LinkContainer to="/join">
              <button className="btn btn-lg" style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  color: 'white'
                }}> 
                Join Our Community
                </button>
              </LinkContainer>
              <LinkContainer to="/projects">
                <button className="btn btn-outline-light btn-lg">
                  View Current Projects
                </button>
              </LinkContainer>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default About