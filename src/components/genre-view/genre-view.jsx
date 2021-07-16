import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './genre-view.scss';

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Row className='genre-view justify-content-md-center'>
        <Col md='auto'>
          <div className='genre-name'>
            <span className='title'>{genre.Name}</span>
            <div className='value'>{genre.Description}</div>
          </div>
          <div className='genre-movies'>
            <span className='title'>{genre.Name} Movies:</span>
            <div className='value'>
              {genre.Movies
                .map(t => <div>{t}</div>)
                // .reduce((prev, curr) => [prev, ', ', curr])
              }
            </div>
          </div>
          <Button className='back-button' onClick={() => { onBackClick(null); }} variant='light'
            style={{ color: 'white', background: '#9ba9ff' }}>Back</Button>
        </Col>
      </Row >
    );
  }
}