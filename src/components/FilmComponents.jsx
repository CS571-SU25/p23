import { Card, Badge, Button, Modal } from 'react-bootstrap'
import { useState } from 'react'

export function FilmCard({ film, onViewDetails }) {
  return (
    <Card className="h-100 shadow-sm film-card">
      <div className="position-relative">
        <Card.Img 
          variant="top" 
          src={film.thumbnail || 'https://yt3.googleusercontent.com/H4yUn1QFoDlVlxQb7wWXvEFD8e-6YE1Gt3SSwGhHx9aEt8QhN6YpNp8jM7A9XUgbwYCpbFZ-=w2276-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj'} 
          alt={`${film.title} thumbnail`}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="position-absolute top-0 end-0 m-2">
          <Badge bg="dark">{film.duration}</Badge>
        </div>
      </div>
      
      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-2">{film.title}</Card.Title>
        
        <div className="mb-2">
          {film.genres.map((genre, index) => (
            <Badge key={index} bg="secondary" className="me-1 mb-1">
              {genre}
            </Badge>
          ))}
        </div>
        
        <Card.Text className="text-muted mb-3">
          {film.description}
        </Card.Text>
        
        <div className="mt-auto">
          <FilmCredits credits={film.credits} />
          <div className="d-flex gap-2 mt-3">
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => onViewDetails(film)}
            >
              Watch Film
            </Button>
            <Button variant="secondary" size="sm">
              Behind the Scenes
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export function FilmCredits({ credits }) {
  return (
    <div className="film-credits">
      <small className="text-muted d-block">
        <strong>Director:</strong> {credits.director}
      </small>
      {credits.cinematographer && (
        <small className="text-muted d-block">
          <strong>Cinematographer:</strong> {credits.cinematographer}
        </small>
      )}
      {credits.editor && (
        <small className="text-muted d-block">
          <strong>Editor:</strong> {credits.editor}
        </small>
      )}
    </div>
  )
}

export function FilmModal({ film, show, onHide }) {
  if (!film) return null

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{film.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="ratio ratio-16x9 mb-3">
          {film.videoUrl ? (
            <iframe
              src={film.videoUrl}
              title={film.title}
              allowFullScreen
              className="rounded"
            ></iframe>
          ) : (
            <div className="d-flex align-items-center justify-content-center bg-light rounded">
              <div className="text-center">
                <h4 className="text-muted">🎬</h4>
                <p className="text-muted">Video coming soon</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="mb-3">
          {film.genres.map((genre, index) => (
            <Badge key={index} bg="secondary" className="me-1">
              {genre}
            </Badge>
          ))}
        </div>
        
        <p>{film.fullDescription || film.description}</p>
        
        <div className="row">
          <div className="col-md-6">
            <h6>Cast & Crew</h6>
            <FilmCredits credits={film.credits} />
            {film.cast && (
              <div className="mt-2">
                <small className="text-muted d-block">
                  <strong>Cast:</strong> {film.cast.join(', ')}
                </small>
              </div>
            )}
          </div>
          <div className="col-md-6">
            <h6>Production Details</h6>
            <small className="text-muted d-block">
              <strong>Duration:</strong> {film.duration}
            </small>
            <small className="text-muted d-block">
              <strong>Release Date:</strong> {film.releaseDate}
            </small>
            {film.awards && (
              <small className="text-muted d-block">
                <strong>Awards:</strong> {film.awards}
              </small>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export function FilmFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="mb-4">
      <h5>Filter by Category</h5>
      <div className="d-flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === 'all' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => onCategoryChange('all')}
        >
          All Films
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  )
}