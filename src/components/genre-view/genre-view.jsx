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
            <span className='value'>{genre.Name}</span>
          </div>
          <div className='genre-description'>
            <span className='value'>{genre.Description}</span>
          </div>
          <Button className='back-button' onClick={() => { onBackClick(null); }} variant='light'
            style={{ color: 'white', background: '#9ba9ff' }}>Back</Button>
        </Col>
      </Row >
    );
  }
}