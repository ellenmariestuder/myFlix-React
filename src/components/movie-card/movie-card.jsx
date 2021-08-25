import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Accordion } from 'react-bootstrap';

import { Link } from "react-router-dom";

import './movie-card.scss'

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    return (
      <Accordion>
        <Card style={{ marginTop: '1em' }}>
          <div class="card-image-container">
            <Card.Img variant='top' src={movie.ImagePath} />
          </div>
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>

            <Card.Text>
              <Accordion.Toggle as={Button} variant="link" eventKey="0"
                style={{ color: '#4d65ff' }}>
                Description
              </Accordion.Toggle>
            </Card.Text>

            <Accordion.Collapse eventKey="0">
              <Card.Text>{movie.Description}</Card.Text>
            </Accordion.Collapse>

            <Link to={`/movies/${movie._id}`}>
              <Button variant='light' style={{ color: 'white', background: '#9ba9ff' }}>Open</Button>
            </Link>
          </Card.Body>
        </Card>
      </Accordion >
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired
};