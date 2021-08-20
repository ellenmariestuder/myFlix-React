import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

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