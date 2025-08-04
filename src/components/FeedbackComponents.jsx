import { Card, Button, Form, Badge, Modal, Row, Col } from 'react-bootstrap'
import { useState } from 'react'

export function FeedbackCard({ feedback, onReply, onLike, hasLiked }) {
  const [showReplies, setShowReplies] = useState(false)

  const getTypeVariant = (type) => {
    switch (type) {
      case 'review': return 'primary'
      case 'suggestion': return 'info'
      case 'question': return 'warning'
      case 'compliment': return 'success'
      default: return 'secondary'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Card className="mb-3 feedback-card">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div className="d-flex align-items-center">
            <div className="me-3">
              <div 
                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                style={{ width: '40px', height: '40px', fontSize: '16px' }}
              >
                {feedback.author.charAt(0).toUpperCase()}
              </div>
            </div>
            <div>
              <h6 className="mb-0">{feedback.author}</h6>
              <small className="text-muted">{formatDate(feedback.date)}</small>
            </div>
          </div>
          <Badge bg={getTypeVariant(feedback.type)}>
            {feedback.type}
          </Badge>
        </div>

        {feedback.filmTitle && (
          <div className="mb-2">
            <small className="text-muted">
              <strong>About:</strong> {feedback.filmTitle}
            </small>
          </div>
        )}

        {feedback.rating && (
          <div className="mb-2">
            <StarRating rating={feedback.rating} />
          </div>
        )}

        <Card.Text>{feedback.content}</Card.Text>

        <div className="d-flex align-items-center gap-3">
          <Button 
            variant="link" 
            size="sm" 
            className={`p-0 ${hasLiked ? 'text-primary' : 'text-muted'}`}
            onClick={() => onLike(feedback.id)}
          >
            {hasLiked ? '👍' : '👍'} {feedback.likes} {feedback.likes === 1 ? 'Like' : 'Likes'}
            {hasLiked && <small className="ms-1">(You liked this)</small>}
          </Button>
          
          <Button 
            variant="link" 
            size="sm" 
            className="p-0 text-muted"
            onClick={() => onReply(feedback)}
          >
            💬 Reply
          </Button>

          {feedback.replies && feedback.replies.length > 0 && (
            <Button 
              variant="link" 
              size="sm" 
              className="p-0 text-muted"
              onClick={() => setShowReplies(!showReplies)}
            >
              {showReplies ? 'Hide' : 'Show'} {feedback.replies.length} {feedback.replies.length === 1 ? 'Reply' : 'Replies'}
            </Button>
          )}
        </div>

        {showReplies && feedback.replies && (
          <div className="mt-3 ps-4 border-start">
            {feedback.replies.map((reply, index) => (
              <div key={index} className="mb-2 p-2 bg-light rounded">
                <div className="d-flex justify-content-between">
                  <small><strong>{reply.author}</strong></small>
                  <small className="text-muted">{formatDate(reply.date)}</small>
                </div>
                <small>{reply.content}</small>
              </div>
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  )
}

export function StarRating({ rating, onRatingChange, readonly = true }) {
  const [hover, setHover] = useState(0)

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1
        return (
          <span
            key={index}
            className={`star ${ratingValue <= (hover || rating) ? 'filled' : ''}`}
            onClick={() => !readonly && onRatingChange && onRatingChange(ratingValue)}
            onMouseEnter={() => !readonly && setHover(ratingValue)}
            onMouseLeave={() => !readonly && setHover(0)}
            style={{ 
              cursor: readonly ? 'default' : 'pointer',
              fontSize: '20px',
              color: ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'
            }}
          >
            ★
          </span>
        )
      })}
    </div>
  )
}

export function FeedbackForm({ onSubmit, onCancel, replyTo = null }) {
  const [formData, setFormData] = useState({
    author: '',
    type: replyTo ? 'reply' : 'review',
    filmTitle: '',
    rating: 0,
    content: ''
  })

  const feedbackTypes = [
    { value: 'review', label: 'Film Review' },
    { value: 'suggestion', label: 'Suggestion' },
    { value: 'question', label: 'Question' },
    { value: 'compliment', label: 'Compliment' }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.author.trim() && formData.content.trim()) {
      onSubmit({
        ...formData,
        date: new Date().toISOString(),
        likes: 0,
        replies: [],
        id: Date.now()
      })
      setFormData({
        author: '',
        type: replyTo ? 'reply' : 'review',
        filmTitle: '',
        rating: 0,
        content: ''
      })
    }
  }

  return (
    <Card className="mb-4">
      <Card.Header>
        <h5 className="mb-0">
          {replyTo ? `Reply to ${replyTo.author}` : 'Share Your Feedback'}
        </h5>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Your Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                />
              </Form.Group>
            </Col>
            
            {!replyTo && (
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Feedback Type</Form.Label>
                  <Form.Select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                  >
                    {feedbackTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            )}
          </Row>

          {!replyTo && formData.type === 'review' && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Film Title (Optional)</Form.Label>
                <Form.Control
                  type="text"
                  name="filmTitle"
                  value={formData.filmTitle}
                  onChange={handleInputChange}
                  placeholder="Which film are you reviewing?"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Rating</Form.Label>
                <div>
                  <StarRating 
                    rating={formData.rating}
                    onRatingChange={(rating) => setFormData(prev => ({ ...prev, rating }))}
                    readonly={false}
                  />
                </div>
              </Form.Group>
            </>
          )}

          <Form.Group className="mb-3">
            <Form.Label>
              {replyTo ? 'Your Reply' : 'Your Feedback'} *
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder={
                replyTo 
                  ? "Write your reply..." 
                  : "Share your thoughts, suggestions, or questions about our films and club..."
              }
              required
            />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button type="submit" variant="primary">
              {replyTo ? 'Post Reply' : 'Submit Feedback'}
            </Button>
            {onCancel && (
              <Button type="button" variant="secondary" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}

export function FeedbackFilter({ types, selectedType, onTypeChange }) {
  return (
    <div className="mb-4">
      <h5>Filter Feedback</h5>
      <div className="d-flex flex-wrap gap-2">
        <Button
          variant={selectedType === 'all' ? 'primary' : 'outline-primary'}
          size="sm"
          onClick={() => onTypeChange('all')}
        >
          All Feedback
        </Button>
        {types.map((type) => (
          <Button
            key={type}
            variant={selectedType === type ? 'primary' : 'outline-primary'}
            size="sm"
            onClick={() => onTypeChange(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}s
          </Button>
        ))}
      </div>
    </div>
  )
}

export function ReplyModal({ show, onHide, feedback, onSubmitReply }) {
  const [replyContent, setReplyContent] = useState('')
  const [authorName, setAuthorName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (authorName.trim() && replyContent.trim()) {
      onSubmitReply(feedback.id, {
        author: authorName,
        content: replyContent,
        date: new Date().toISOString()
      })
      setReplyContent('')
      setAuthorName('')
      onHide()
    }
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Reply to {feedback?.author}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {feedback && (
          <div className="mb-3 p-3 bg-light rounded">
            <strong>{feedback.author}:</strong>
            <p className="mb-0 mt-1">{feedback.content}</p>
          </div>
        )}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Your Name *</Form.Label>
            <Form.Control
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Your Reply *</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write your reply..."
              required
            />
          </Form.Group>
          
          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Post Reply
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}