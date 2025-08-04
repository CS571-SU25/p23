import { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { FeedbackCard, FeedbackForm, FeedbackFilter, ReplyModal } from '../components/FeedbackComponents'
import { PageHeader } from '../components/UIComponents'

function Feedback() {
  const [currentUser] = useState('Anonymous User') // In a real app, this would come from authentication
  const [userLikes, setUserLikes] = useState({}) // Track which feedbacks the current user has liked
  
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      author: "Emma Chen",
      type: "review",
      filmTitle: "The Last Frame",
      rating: 5,
      content: "Absolutely stunning cinematography! The way you captured the emotions through lighting was incredible. This film really made me think about the power of photography and memory. Can't wait to see what you create next!",
      date: "2024-01-15T10:30:00Z",
      likes: 12,
      replies: [
        {
          author: "Sarah Chen",
          content: "Thank you so much Emma! Your feedback means the world to us. We spent weeks perfecting those lighting techniques.",
          date: "2024-01-15T14:20:00Z"
        },
        {
          author: "Mike Rodriguez",
          content: "Emma, thanks for noticing the cinematography details! It was a challenging but rewarding shoot.",
          date: "2024-01-16T09:15:00Z"
        }
      ]
    },
    {
      id: 2,
      author: "Carlos Martinez",
      type: "suggestion",
      content: "Have you considered doing more experimental films? I love the creative direction the club is taking, but I'd be excited to see some avant-garde pieces that really push boundaries. Maybe we could do a collaborative experimental project?",
      date: "2024-01-14T16:45:00Z",
      likes: 8,
      replies: [
        {
          author: "Jordan Kim",
          content: "Carlos, great minds think alike! I'm actually working on 'The Art of Silence' which is very experimental. Would love to collaborate!",
          date: "2024-01-14T18:30:00Z"
        }
      ]
    },
    {
      id: 3,
      author: "Maya Patel",
      type: "review",
      filmTitle: "Coffee Shop Chronicles",
      rating: 4,
      content: "Such a heartwarming comedy! I loved how each character had their own unique story arc. The barista's subplot was my favorite - so relatable! The dialogue felt natural and the timing was perfect. Minor critique: some of the background music was a bit loud in the middle section.",
      date: "2024-01-13T09:20:00Z",
      likes: 15,
      replies: []
    },
    {
      id: 4,
      author: "Alex Johnson",
      type: "question",
      content: "I'm curious about the post-production process for your films. What software do you typically use for editing and color grading? As a new member, I'd love to learn more about the technical side of filmmaking. Are there workshops planned?",
      date: "2024-01-12T14:10:00Z",
      likes: 6,
      replies: [
        {
          author: "Taylor Johnson",
          content: "Alex, we use a mix of DaVinci Resolve and Adobe Premiere Pro. Planning a workshop next month - keep an eye on the events calendar!",
          date: "2024-01-12T16:45:00Z"
        }
      ]
    },
    {
      id: 5,
      author: "Lisa Rodriguez",
      type: "compliment",
      content: "I just want to say how impressed I am with the quality and diversity of films coming out of Qindeel. You're all so talented and supportive of each other. The club has such a positive, creative energy. Keep up the amazing work!",
      date: "2024-01-11T11:30:00Z",
      likes: 23,
      replies: [
        {
          author: "Multiple Members",
          content: "Thank you Lisa! Comments like this motivate us to keep creating and supporting each other.",
          date: "2024-01-11T13:00:00Z"
        }
      ]
    },
    {
      id: 6,
      author: "David Park",
      type: "review",
      filmTitle: "Silent Conversations",
      rating: 5,
      content: "This film opened my eyes to a whole new perspective. The storytelling through visual language was masterful, and I learned so much about deaf culture. Thank you for creating something so educational and beautiful. The collaboration with the deaf community really shows.",
      date: "2024-01-10T13:15:00Z",
      likes: 18,
      replies: [
        {
          author: "Alex Rivera",
          content: "David, thank you! This project was incredibly meaningful to work on. The deaf community taught us so much.",
          date: "2024-01-10T15:20:00Z"
        }
      ]
    },
    {
      id: 7,
      author: "Sophie Turner",
      type: "suggestion",
      content: "Would love to see more behind-the-scenes content! Maybe short documentaries about the making of each film? It would be great for new members to understand the filmmaking process and see how collaborative everything is.",
      date: "2024-01-09T16:40:00Z",
      likes: 11,
      replies: []
    },
    {
      id: 8,
      author: "Marcus Kim",
      type: "question",
      content: "Are there opportunities for alumni to stay involved with the club? I graduated last year but would love to mentor current members or help with advanced projects. The skills I learned at Qindeel have been invaluable in my career.",
      date: "2024-01-08T10:25:00Z",
      likes: 9,
      replies: [
        {
          author: "Club Leadership",
          content: "Marcus, we'd love to have you as a mentor! Please reach out to us directly to discuss alumni involvement opportunities.",
          date: "2024-01-08T12:30:00Z"
        }
      ]
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [selectedType, setSelectedType] = useState('all')
  const [replyModalData, setReplyModalData] = useState({ show: false, feedback: null })

  const types = [...new Set(feedbacks.map(feedback => feedback.type))]
  
  const filteredFeedbacks = selectedType === 'all' 
    ? feedbacks 
    : feedbacks.filter(feedback => feedback.type === selectedType)

  const handleSubmitFeedback = (newFeedback) => {
    setFeedbacks(prev => [newFeedback, ...prev])
    setShowForm(false)
  }

  const handleLike = (feedbackId) => {
    const hasLiked = userLikes[feedbackId]
    
    setUserLikes(prev => ({
      ...prev,
      [feedbackId]: !hasLiked
    }))
    
    setFeedbacks(prev => prev.map(feedback => 
      feedback.id === feedbackId 
        ? { 
            ...feedback, 
            likes: hasLiked ? feedback.likes - 1 : feedback.likes + 1 
          }
        : feedback
    ))
  }

  const handleReply = (feedback) => {
    setReplyModalData({ show: true, feedback })
  }

  const handleSubmitReply = (feedbackId, reply) => {
    setFeedbacks(prev => prev.map(feedback => 
      feedback.id === feedbackId 
        ? { ...feedback, replies: [...(feedback.replies || []), reply] }
        : feedback
    ))
  }

  const handleCloseReplyModal = () => {
    setReplyModalData({ show: false, feedback: null })
  }

  const stats = {
    total: feedbacks.length,
    reviews: feedbacks.filter(f => f.type === 'review').length,
    avgRating: feedbacks.filter(f => f.rating).reduce((acc, f) => acc + f.rating, 0) / 
               feedbacks.filter(f => f.rating).length || 0,
    totalLikes: feedbacks.reduce((acc, f) => acc + f.likes, 0)
  }

  return (
    <Container className="py-5">
      <PageHeader 
        title="Feedback Wall"
        subtitle="Share your thoughts, reviews, and suggestions about our films and club activities. Your feedback helps us grow and improve as filmmakers and storytellers."
      />

      <div className="mb-4 p-4 bg-light rounded">
        <Row className="text-center">
          <Col md={3}>
            <h4 className="text-primary mb-0">{stats.total}</h4>
            <small className="text-muted">Total Feedback</small>
          </Col>
          <Col md={3}>
            <h4 className="text-success mb-0">{stats.reviews}</h4>
            <small className="text-muted">Film Reviews</small>
          </Col>
          <Col md={3}>
            <h4 className="text-warning mb-0">{stats.avgRating.toFixed(1)}★</h4>
            <small className="text-muted">Average Rating</small>
          </Col>
          <Col md={3}>
            <h4 className="text-info mb-0">{stats.totalLikes}</h4>
            <small className="text-muted">Total Likes</small>
          </Col>
        </Row>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button 
          variant="primary" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '✍️ Share Feedback'}
        </Button>
      </div>

      {showForm && (
        <FeedbackForm 
          onSubmit={handleSubmitFeedback}
          onCancel={() => setShowForm(false)}
        />
      )}

      <FeedbackFilter 
        types={types}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
      />

      <Row>
        <Col lg={8}>
          {filteredFeedbacks.map((feedback) => (
            <FeedbackCard 
              key={feedback.id}
              feedback={feedback}
              onReply={handleReply}
              onLike={handleLike}
              hasLiked={userLikes[feedback.id] || false}
            />
          ))}

          {filteredFeedbacks.length === 0 && (
            <div className="text-center py-5">
              <h4 className="text-muted">No feedback found</h4>
              <p className="text-muted">Try selecting a different filter or be the first to share feedback!</p>
            </div>
          )}
        </Col>

        <Col lg={4}>
          <div className="sticky-top" style={{ top: '100px' }}>
            <div className="bg-primary text-white p-4 rounded mb-4">
              <h5>💡 Feedback Guidelines</h5>
              <ul className="mb-0 small">
                <li>Be constructive and respectful</li>
                <li>Share specific details about what you liked or suggestions for improvement</li>
                <li>Ask questions if you're curious about techniques or processes</li>
                <li>Celebrate achievements and milestones</li>
              </ul>
            </div>

            <div className="bg-light p-4 rounded">
              <h6>🎬 Recent Films</h6>
              <div className="small">
                <div className="mb-2">
                  <strong>The Last Frame</strong><br/>
                  <span className="text-muted">★★★★★ • Drama</span>
                </div>
                <div className="mb-2">
                  <strong>Coffee Shop Chronicles</strong><br/>
                  <span className="text-muted">★★★★☆ • Comedy</span>
                </div>
                <div className="mb-2">
                  <strong>Silent Conversations</strong><br/>
                  <span className="text-muted">★★★★★ • Drama</span>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <ReplyModal 
        show={replyModalData.show}
        onHide={handleCloseReplyModal}
        feedback={replyModalData.feedback}
        onSubmitReply={handleSubmitReply}
      />
    </Container>
  )
}

export default Feedback