import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import UnopDropdown from 'unop-react-dropdown';

import './profile-view.scss';

import { Link } from "react-router-dom";

export class UserView extends React.Component {
  render() {
    const { userData } = this.props;

    console.log('user-view line 13');
    console.log(userData);

    return (
      <Row className='user-view justify-content-md-center'>
        <Col md='auto'>
          <div className='user-name'>
            <div className='section-header'>Hello {`${userData.Username}`}!</div>
          </div>

          <div className='user-section'>
            <div className='section-header'> Your info: </div>
            <div className='user-username'>
              <span className='title'>Username: </span>
              <span className='value'>{`${userData.Username}`}</span>
              <div>
                <UnopDropdown align='center' className='float-right' trigger={
                  <Button className='float-right update-button' variant='light' style={{ color: 'white', background: '#4d65ff' }}>Update</Button>
                }>
                  <form className='side-by-side'>
                    <input type='text' placeholder='New username' name='username' />
                    <input type='submit' value='Submit' />
                  </form>
                </UnopDropdown>
                {/* <Button className='float-right update-button' variant='light' style={{ color: 'white', background: '#4d65ff' }}>Update</Button> */}
              </div>
            </div>

            <div className='user-email'>
              <span className='title'>Email: </span>
              <span className='value'>{`${userData.Email}`}</span>
              <div>
                <UnopDropdown align='center' className='float-right' trigger={
                  <Button className='float-right update-button' variant='light' style={{ color: 'white', background: '#4d65ff' }}>Update</Button>
                }>
                  <form className='side-by-side'>
                    <input type="text" placeholder='New email' name="password" />
                    <input type="submit" value="Submit" />
                  </form>
                </UnopDropdown>
              </div>
            </div>

            <div className='user-password'>
              <span className='title'>Password: ********</span>
              {/* <span className='value'>{`${userData.Password}`}</span> */}
              <div>
                <UnopDropdown align='center' className='float-right' trigger={
                  <Button className='float-right update-button' variant='light' style={{ color: 'white', background: '#4d65ff' }}>Update</Button>
                }>
                  <form className='side-by-side'>
                    <input type="text" placeholder='New password' name="password" />
                    <input type="submit" value="Submit" />
                  </form>
                </UnopDropdown>
              </div>
            </div>

            <div className='user-birthday'>
              <span className='title'>Birthday: </span>
              <span className='value'>{`${userData.Birthday}`}</span>
              <div>
                <UnopDropdown align='center' className='float-right' trigger={
                  <Button className='float-right update-button' variant='light' style={{ color: 'white', background: '#4d65ff' }}>Update</Button>
                }>
                  <form className='side-by-side'>
                    <input type="text" placeholder='New birthday' name="password" />
                    <input type="submit" value="Submit" />
                  </form>
                </UnopDropdown>
              </div>
            </div>
          </div>

          <div className='user-section'>
            <div className='section-header'> Your favorite movies: </div>
            <div className='user-movies'>
              <div className='value'>
                {userData.FavoriteMovies
                  .map(t => <div>{t}</div>)
                  // .reduce((prev, curr) => [prev, ', ', curr])
                }
                <div>
                  <UnopDropdown align='center' className='float-right' trigger={
                    <Button className='float-right update-button' variant='outline-danger'>Remove</Button>
                  }>
                    <form className='side-by-side'>
                      <input type="text" placeholder='Movie title' name="password" />
                      <input type="submit" value="Remove from Favorites" />
                    </form>
                  </UnopDropdown>
                </div>
              </div>
            </div>
          </div>

          <div className='user-section'>
            <div className='section-header'> Deregister your account: </div>
            <Button variant='danger'>Deregister</Button>
          </div>

          <Link to={`/`}>
            <Button variant='light' style={{ color: 'white', background: '#9ba9ff' }}>Home</Button>
          </Link>
        </Col>
      </Row >
    );
  }
}