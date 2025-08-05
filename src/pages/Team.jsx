import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { TeamMemberCard, TeamMemberModal, TeamStatsCard, TeamFilter, LeadershipSection } from '../components/TeamComponents'
import { PageHeader } from '../components/UIComponents'

function Team() {
  const [selectedMember, setSelectedMember] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedRole, setSelectedRole] = useState('all')

  const teamMembers = [
    {
      id: 1,
      name: "Alfonso Cuarón",
      role: "Director",
      year: "Senior",
      major: "Film Studies",
      minor: "Philosophy",
      bio: "Visionary director known for innovative cinematography and intimate storytelling. Specializes in long takes and immersive visual experiences.",
      fullBio: "Alfonso brings a unique vision that combines technical mastery with deeply human stories. Known for pushing the boundaries of cinematography and creating immersive worlds that draw audiences into the narrative. His approach to filmmaking emphasizes the importance of visual storytelling and the power of the moving camera.",
      specialties: ["President", "Directing", "Cinematography", "Visual Storytelling"],
      isLeadership: true,
      gradientColors: ["#667eea", "#764ba2"],
      achievements: [
        "Founded innovative cinematography techniques adopted club-wide",
        "Best Director Award - International Student Film Festival 2024",
        "Pioneered immersive storytelling workshops"
      ],
      favoriteFilms: "Children of Men, Roma, Gravity",
      quote: "I have to trust my unconscious, the laws of chance, what comes out is what I should be doing.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/DisclaimerBFILFF101024_%2888_of_113%29_%2854062275143%29_%28cropped%29.jpg/500px-DisclaimerBFILFF101024_%2888_of_113%29_%2854062275143%29_%28cropped%29.jpg"
    },
    {
      id: 2,
      name: "Nobuhiko Obayashi",
      role: "Experimental Director",
      year: "Senior",
      major: "Media Arts",
      bio: "Master of surreal and experimental cinema. Known for blending genres and creating dreamlike visual experiences.",
      fullBio: "Nobuhiko brings an experimental approach that challenges conventional filmmaking. His work explores the boundaries between reality and fantasy, incorporating innovative editing techniques and surreal imagery. He mentors students in experimental filmmaking and encourages creative risk-taking.",
      specialties: ["Experimental Film", "Surreal Imagery", "Genre Blending"],
      isLeadership: true,
      gradientColors: ["#ff9a9e", "#fecfef"],
      achievements: [
        "Established the club's experimental film division",
        "Best Experimental Film - Regional Arts Festival 2024",
        "Created groundbreaking visual effects on minimal budget"
      ],
      favoriteFilms: "House (Hausu), School in the Crosshairs, The Girl Who Leapt Through Time",
      quote: "Films should be like dreams. They should make you feel something you've never felt before.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Nobuhiko_Obayashi_cropped_2_Nobuhiko_Obayashi_201911.jpg/500px-Nobuhiko_Obayashi_cropped_2_Nobuhiko_Obayashi_201911.jpg"
    },
    {
      id: 3,
      name: "Luca Guadagnino",
      role: "Intimacy Director",
      year: "Junior",
      major: "Art History",
      minor: "Literature",
      bio: "Specialist in character-driven narratives and sensual storytelling. Expert at capturing human emotions and relationships.",
      fullBio: "Luca focuses on the intimate aspects of filmmaking, creating stories that explore human connection and desire. His approach emphasizes the importance of atmosphere, color, and texture in visual storytelling. He leads workshops on directing actors and creating emotional authenticity.",
      specialties: ["Character Development", "Atmospheric Storytelling", "Actor Direction"],
      isLeadership: true,
      gradientColors: ["#ffecd2", "#fcb69f"],
      achievements: [
        "Best Drama Award - University Film Showcase 2024",
        "Developed actor coaching program for the club",
        "Expert in creating authentic emotional performances"
      ],
      favoriteFilms: "Call Me by Your Name, A Bigger Splash, Suspiria",
      quote: "Cinema is about desire. Every frame should pulse with life and longing.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Luca_Guadagnino-63112.jpg/500px-Luca_Guadagnino-63112.jpg"
    },
    {
      id: 4,
      name: "Alice Rohrwacher",
      role: "Creative Director",
      year: "Junior",
      major: "Anthropology",
      minor: "Environmental Studies",
      bio: "Poetic filmmaker focused on rural narratives and social realism. Known for her authentic portrayal of working-class life.",
      fullBio: "Alice brings a deeply humanistic approach to filmmaking, focusing on stories of ordinary people and rural communities. Her work combines social consciousness with poetic imagery, creating films that are both beautiful and meaningful. She advocates for authentic storytelling and diverse voices.",
      specialties: ["Social Realism", "Rural Cinema", "Authentic Storytelling"],
      isLeadership: false,
      gradientColors: ["#a8edea", "#fed6e3"],
      achievements: [
        "Best Social Impact Film - International Student Festival 2024",
        "Founded the club's community outreach program",
        "Expert in non-professional actor direction"
      ],
      favoriteFilms: "The Wonders, Happy as Lazzaro, La Chimera",
      quote: "Cinema should show us what we don't usually see, make us understand what we thought we knew.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Alice_Rohrwacher-5050.jpg/500px-Alice_Rohrwacher-5050.jpg"
    },
    {
      id: 5,
      name: "Luis Buñuel",
      role: "Surrealist Filmmaker",
      year: "Graduate Student",
      major: "Philosophy",
      minor: "Psychology",
      bio: "Master of surrealist cinema and social critique. Known for challenging conventional narrative structures and bourgeois values.",
      fullBio: "Luis brings a revolutionary approach to filmmaking that questions social norms and explores the subconscious mind. His films combine dark humor with surreal imagery to create thought-provoking critiques of society. He mentors students in avant-garde techniques and encourages political consciousness in art.",
      specialties: ["Surrealism", "Social Critique", "Avant-garde Techniques"],
      isLeadership: false,
      gradientColors: ["#667eea", "#764ba2"],
      achievements: [
        "Pioneer of surrealist techniques in student cinema",
        "Best Avant-garde Film - European Student Festival 2024",
        "Established critical theory discussion groups"
      ],
      favoriteFilms: "Un Chien Andalou, The Discreet Charm of the Bourgeoisie, Belle de Jour",
      quote: "I'm still an atheist, thank God. The only way to be a true revolutionary is through cinema.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/LuisBu%C3%B1uel1929.jpg/500px-LuisBu%C3%B1uel1929.jpg"
    },
    {
      id: 6,
      name: "Yorgos Lanthimos",
      role: "Absurdist Director",
      year: "Senior",
      major: "Theater Arts",
      minor: "Psychology",
      bio: "Distinctive filmmaker known for dark comedy and dystopian narratives. Master of creating uncomfortable yet compelling viewing experiences.",
      fullBio: "Yorgos brings a unique voice that combines dark humor with psychological insight. His work explores power dynamics and human behavior through distinctive visual style and deadpan delivery. He challenges students to think outside conventional storytelling and embrace the absurd.",
      specialties: ["Dark Comedy", "Dystopian Narratives", "Psychological Drama"],
      isLeadership: false,
      gradientColors: ["#ff6b6b", "#feca57"],
      achievements: [
        "Best Dark Comedy - Alternative Cinema Festival 2024",
        "Developed unconventional acting techniques",
        "Master of creating distinctive visual atmospheres"
      ],
      favoriteFilms: "The Favourite, The Lobster, Dogtooth",
      quote: "I like films that make people feel uncomfortable, that challenge their preconceptions.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Yorgos_Lanthimos_2023_%28cropped%29.jpg/500px-Yorgos_Lanthimos_2023_%28cropped%29.jpg"
    }
  ]

  const leaders = teamMembers.filter(member => member.isLeadership)
  const regularMembers = teamMembers.filter(member => !member.isLeadership)
  
const roles = [...new Set(teamMembers.slice(3).map(member => member.role))]

  const filteredMembers = selectedRole === 'all' 
    ? regularMembers 
    : regularMembers.filter(member => member.role.toLowerCase().includes(selectedRole.toLowerCase()))

  const teamStats = [
    { number: teamMembers.length, label: "Master Filmmakers" },
    { number: leaders.length, label: "Leadership Team" },
    { number: "50+", label: "Years Combined Experience" },
    { number: "6", label: "Unique Styles" }
  ]

  const handleViewProfile = (member) => {
    setSelectedMember(member)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedMember(null)
  }

  return (
    <>
      <div className="bg-light py-5 mb-5">
        <Container>
          <PageHeader 
            title="Meet Our Team"
            subtitle="Get to know the talented filmmakers, storytellers, and creative minds behind Qindeel Filmmaking Club. Our diverse team brings together different perspectives, skills, and passions unified by our love for cinema."
          />
        </Container>
      </div>

      <Container>
        <TeamStatsCard stats={teamStats} />

        <LeadershipSection 
          leaders={leaders}
          onViewProfile={handleViewProfile}
        />

        <div className="mb-5">
          <h2 className="text-center mb-4">Our Members</h2>
          
          <TeamFilter 
            roles={roles}
            selectedRole={selectedRole}
            onRoleChange={setSelectedRole}
          />

          <Row>
            {filteredMembers.map((member) => (
              <Col lg={4} md={6} className="mb-4" key={member.id}>
                <TeamMemberCard 
                  member={member}
                  onViewProfile={handleViewProfile}
                />
              </Col>
            ))}
          </Row>

          {filteredMembers.length === 0 && (
            <div className="text-center py-5">
              <h4 className="text-muted">No members found</h4>
              <p className="text-muted">Try selecting a different role filter.</p>
            </div>
          )}
        </div>

        <TeamMemberModal 
          member={selectedMember}
          show={showModal}
          onHide={handleCloseModal}
        />

        <div className="text-center mb-5">
          <div className="bg-gradient p-5 rounded text-white">
            <h3>Want to Join Our Team?</h3>
            <p className="lead mb-4">
              We're always looking for passionate storytellers, whether you're experienced or just starting out. 
              Every skill level and background is welcome in our creative community.
            </p>
            <div className="d-flex gap-3 justify-content-center">
              <a href="#/join" className="btn btn-light btn-lg" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                Join Qindeel Today
              </a>
              <a href="#/projects" className="btn btn-outline-light btn-lg">
                View Open Roles
              </a>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Team