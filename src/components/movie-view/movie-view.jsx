import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './movie-view.scss';

import { Link } from "react-router-dom";

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Row className='movie-view justify-content-md-center'>
        <Col md='auto' className='movie-poster'>
          <img src={movie.ImagePath} style={{ height: '25em' }} />
        </Col>
        <Col md='auto'>
          <div className='movie-title'>
            <span className='value'>{movie.Title}</span>
          </div>
          <div className='movie-director'>
            <span className='value'>Director: {movie.Director.Name}</span>
          </div>
          <div className='movie-genre'>
            <span className='value'>Genre: {movie.Genre.Name}</span>
          </div>
          <Link to={`/genre/${movie.Genre.Name}`}>
            <Button variant='link'>Genre</Button>
          </Link>
          <Link to={`/director/${movie.Director.Name}`}>
            <Button variant='link'>Director</Button>
          </Link>
          <div className='movie-description'>
            <span className='value'>{movie.Description}</span>
          </div>
          <Button className='back-button' onClick={() => { onBackClick(null); }} variant='light'
            style={{ color: 'white', background: '#9ba9ff' }}>Back</Button>
        </Col>
      </Row >
    );
  }
}