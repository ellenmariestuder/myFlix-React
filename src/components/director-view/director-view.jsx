import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './director-view.scss';

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <Row className='director-view justify-content-md-center'>
        <Col md='auto'>
          <div className='director-name'>
            <span className='title'>{director.Name}</span>
            <div className='value'>{director.Bio}</div>
          </div>
          <div className='director-movies'>
            <span className='title'>{director.Name} Movies:</span>
            <div className='value'>
              {director.Movies
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