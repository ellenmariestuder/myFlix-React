import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

// import './profile-view.scss';

export class UserView extends React.Component {
  render() {
    const { userData, onBackClick } = this.props;
    // const { user, token, history, userData, onBackClick } = this.props;
    // const { onBackClick } = this.props;

    return (
      <Row className='user-view justify-content-md-center'>
        <Col md='auto'>
          <div className='user-name'>
            <span className='value'>Hello {`${userData.Username}`}</span>
          </div>
          <div className='user-email'>
            <span className='value'>{`${userData.Email}`}</span>
          </div>
          {/* <div className='user-movies'>
            <span className='value'>Favorite Movies: {`${userData.FavoriteMovies}`}</span>
          </div> */}
          <Button className='back-button' onClick={() => { onBackClick(null); }} variant='light'
            style={{ color: 'white', background: '#9ba9ff' }}>Back</Button>
        </Col>
      </Row >
    );
  }
}