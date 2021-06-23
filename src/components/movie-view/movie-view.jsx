import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Row className='movie-view'>
        <Col>
          <div className='movie-poster'>
            <img src={movie.ImagePath} />
          </div>
        </Col>

        <Col>
          <div className='movie-title'>
            {/* <span className='label'>Title: </span> */}
            <span className='value'>{movie.Title}</span>
          </div>
          <div className='movie-description'>
            {/* <span className='label'>Description: </span> */}
            <span className='value'>{movie.Description}</span>
          </div>
        </Col>
        <Button onClick={() => { onBackClick(null); }} variant='primary'>Back</Button>
      </Row>
    );
  }
}