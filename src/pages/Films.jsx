import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FilmCard, FilmModal, FilmFilter } from '../components/FilmComponents'
import { PageHeader } from '../components/UIComponents'

function Films() {
  const [selectedFilm, setSelectedFilm] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const mockFilms = [
    {
      id: 1,
      title: "Wrappers",
      description: "Wrappers, where we listen to your songs for you. Get the best Spotify wrapped in your friend group.",
      fullDescription: "A satirical short film that humorously explores the obsession with Spotify Wrapped. The film follows a person of friends as he eagerly await their annual Spotify Wrapped results, only to discover that their musical tastes are not as unique as they thought. The film critiques the culture of social media sharing and the pressure to have 'cool' music tastes.",
      thumbnail: "https://i.ytimg.com/an_webp/1-ehoS-SHrM/mqdefault_6s.webp?du=3000&sqp=COL2w8QG&rs=AOn4CLBQB3OvxYkUFyxCviNQDWKkDnzvqA",
      duration: "1 min",
      genres: ["Comedy", "Short"],
      releaseDate: "March 2023",
      videoUrl: "https://youtu.be/1-ehoS-SHrM?si=4rUo7FtWKzc-_Nvn",
      credits: {
        director: "Abdullah Alwani",
        cinematographer: "Spike Jonez",
        editor: "Thomas Mann"
      },
      cast: ["Selina Meyer", "David Goethe", "Islam Abad"],
      awards: "Best Cinematography - Oscars 2025"
    },
    {
      id: 2,
      title: "Urban Echoes",
      description: "An experimental piece exploring the rhythm and pulse of city life through visual poetry.",
      fullDescription: "Urban Echoes is a visual poem that captures the heartbeat of metropolitan life. Using innovative editing techniques and a compelling sound design, this film transforms everyday city scenes into a meditation on modern urban existence. The project involved over 100 hours of footage shot across different neighborhoods.",
      thumbnail: "https://via.placeholder.com/400x225/7b68ee/fff?text=Urban+Echoes",
      duration: "8 min",
      genres: ["Experimental", "Documentary"],
      releaseDate: "January 2024",
      credits: {
        director: "Jamie Thompson",
        cinematographer: "Lee Wang",
        editor: "Sam Phillips"
      },
      cast: ["Various"],
    },
    {
      id: 3,
      title: "Coffee Shop Chronicles",
      description: "A comedy about the quirky characters who frequent a local coffee shop and their interconnected stories.",
      fullDescription: "Set in the cozy confines of 'The Daily Grind' coffee shop, this comedy weaves together the stories of regular customers and baristas. From the struggling writer to the overly enthusiastic morning jogger, each character brings their own charm to this heartwarming tale about community and connection over caffeine.",
      thumbnail: "https://via.placeholder.com/400x225/ff6b6b/fff?text=Coffee+Shop+Chronicles",
      duration: "15 min",
      genres: ["Comedy", "Drama"],
      releaseDate: "November 2023",
      credits: {
        director: "Jordan Martinez",
        cinematographer: "Casey Brown",
        editor: "Taylor Johnson"
      },
      cast: ["Emma White", "Carlos Lopez", "Nina Patel", "Robert Chang"],
      awards: "Audience Choice Award - Regional Film Competition"
    },
    {
      id: 4,
      title: "Silent Conversations",
      description: "A powerful narrative about communication beyond words, told through the experiences of deaf characters.",
      fullDescription: "Silent Conversations breaks barriers by telling a beautiful story entirely through American Sign Language and visual storytelling. The film follows two friends navigating life's challenges while highlighting the rich culture and community of the deaf experience. This project was created in collaboration with the local deaf community.",
      thumbnail: "https://via.placeholder.com/400x225/50c878/fff?text=Silent+Conversations",
      duration: "18 min",
      genres: ["Drama", "Educational"],
      releaseDate: "September 2023",
      credits: {
        director: "Alex Rivera",
        cinematographer: "Morgan Davis",
        editor: "Jordan Martinez"
      },
      cast: ["Ashley Thompson (deaf)", "Michael Kim (deaf)", "Lisa Rodriguez"],
      awards: "Best Social Impact Film - International Student Festival"
    },
    {
      id: 5,
      title: "Time Capsule",
      description: "A sci-fi short exploring what messages we would send to future generations.",
      fullDescription: "In this thought-provoking science fiction piece, a group of students discovers a mysterious device that allows them to send messages to the future. As they grapple with what to communicate to generations yet unborn, they learn valuable lessons about hope, responsibility, and the power of human connection across time.",
      thumbnail: "https://via.placeholder.com/400x225/ffa500/fff?text=Time+Capsule",
      duration: "22 min",
      genres: ["Sci-Fi", "Drama"],
      releaseDate: "May 2023",
      credits: {
        director: "Quinn Anderson",
        cinematographer: "River Stone",
        editor: "Avery Jackson"
      },
      cast: ["Daniel Kim", "Sophie Turner", "Marcus Johnson", "Elena Vasquez"]
    },
    {
      id: 6,
      title: "Behind the Lens",
      description: "A documentary following our club members through their first year of filmmaking.",
      fullDescription: "This intimate documentary provides a behind-the-scenes look at the Qindeel Filmmaking Club, following several members through their first year of collaborative filmmaking. From initial script ideas to final premieres, the film captures the challenges, triumphs, and friendships that define the creative process.",
      thumbnail: "https://via.placeholder.com/400x225/da70d6/fff?text=Behind+the+Lens",
      duration: "25 min",
      genres: ["Documentary", "Educational"],
      releaseDate: "December 2023",
      credits: {
        director: "Multiple Directors",
        cinematographer: "Club Members",
        editor: "Collective Effort"
      },
      cast: ["Qindeel Club Members"]
    }
  ]

  const categories = [...new Set(mockFilms.flatMap(film => film.genres))]
  
  const filteredFilms = selectedCategory === 'all' 
    ? mockFilms 
    : mockFilms.filter(film => film.genres.includes(selectedCategory))

  const handleViewDetails = (film) => {
    setSelectedFilm(film)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedFilm(null)
  }

  return (
    <Container className="py-5">
      <PageHeader 
        title="Our Films"
        subtitle="Explore our collection of short films, documentaries, and experimental pieces created by talented Qindeel members."
      />

      <FilmFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <Row>
        {filteredFilms.map((film) => (
          <Col lg={4} md={6} className="mb-4" key={film.id}>
            <FilmCard 
              film={film}
              onViewDetails={handleViewDetails}
            />
          </Col>
        ))}
      </Row>

      {filteredFilms.length === 0 && (
        <div className="text-center py-5">
          <h4 className="text-muted">No films found</h4>
          <p className="text-muted">Try selecting a different category.</p>
        </div>
      )}

      <FilmModal 
        film={selectedFilm}
        show={showModal}
        onHide={handleCloseModal}
      />

      <div className="mt-5 text-center">
        <div className="bg-light p-4 rounded">
          <h4>Want to see your film here?</h4>
          <p className="mb-3">
            Join our club and start creating your own cinematic masterpieces. 
            We provide equipment, mentorship, and a supportive community to help bring your vision to life.
          </p>
          <a href="#/join" className="btn btn-primary">
            Join Qindeel Today
          </a>
        </div>
      </div>
    </Container>
  )
}

export default Films