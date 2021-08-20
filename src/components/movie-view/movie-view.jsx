import React from 'react';
import axios from 'axios';
import { Row, Col, Button } from 'react-bootstrap';

import './movie-view.scss';

import { Link } from "react-router-dom";

export class MovieView extends React.Component {

  addFavorite(movie) {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    axios.post(`https://getmyflix.herokuapp.com/users/${user}` + '/movies/' + this.props.movie._id,
      {},
      { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log(response);
        alert(this.props.movie.Title + 'has been added to your favorites!');
      });
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Row className='movie-view justify-content-md-center'>
        <Col md='auto' className='movie-poster'>
          <img src={movie.ImagePath} style={{ height: '25em' }} />
          {/* <Button className='font-weight-bold my-3 d-bock' variant='primary'
            onClick={() => this.addFavorite(movie)} >
            + Add to Favorites
          </Button> */}
        </Col>
        <Col md='auto'>
          <div className='movie-title'>
            <span className='value'>{movie.Title}</span>
          </div>
          <div>
            <span>Genre: </span>
            <Link to={`/genre/${movie.Genre.Name}`}>
              <Button variant='link'>{movie.Genre.Name}</Button>
            </Link>
          </div>
          <div>
            <span>Director: </span>
            <Link to={`/director/${movie.Director.Name}`}>
              <Button variant='link'>{movie.Director.Name}</Button>
            </Link>
          </div>
          <div className='movie-description'>
            <span className='value'>{movie.Description}</span>
          </div>
          <Button className='font-weight-bold my-3 d-bock favorites-btn' variant='primary'
            style={{ color: 'white', backgroundColor: '#4d65ff' }}
            onClick={() => this.addFavorite(movie)} >
            + Add to Favorites
          </Button>
          <Button className='back-button' onClick={() => { onBackClick(null); }} variant='light'
            style={{ color: 'white', background: '#9ba9ff' }}>Back</Button>

        </Col>
      </Row >
    );
  }
}