import axios from 'axios';
// import React, { useState } from 'react';
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import UnopDropdown from 'unop-react-dropdown';

import './profile-view.scss';

import { Link } from "react-router-dom";

export class UserView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favoritemovies: []
    }
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  getUser(token) {
    axios.get(`https://getmyflix.herokuapp.com/users/${localStorage.getItem('user')}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies
        });
        console.log('getUser response', response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // handleSubmitDelete = (e) => {
  //   e.preventDefault();
  //   axios.delete('https://getmyflix.herokuapp.com/users', {
  //     Username: `${userData.Username}`
  //   })
  //     .then(response => {
  //       // const data = response.data;
  //       // console.log(data);
  //       console.log('user was deleted');
  //       // window.open('/', '_self');
  //     })
  //     .catch(e => {
  //       console.log('error deleting user')
  //     })
  // }


  render() {
    const { movies, user } = this.props;
    // const favoritesList = movies.filter(m => {
    //   return this.state.FavoriteMovies.includes(m._id);
    // }); 
    console.log('line 66');
    console.log(this.props);
    console.log(this.state);

    return (
      <Row className='user-view justify-content-md-center'>
        <Col md='auto'>

          <div className='section-header'>Hello {`${this.props.user}`}!</div>

          <div className='user-section'>
            <div className='section-header'> Your info: </div>
            <div className='user-username'>
              <span className='title'>Username: </span>
              <span className='value'>{`${this.props.user}`}</span>
              <div>
                <UnopDropdown align='center' className='float-right' trigger={
                  <Button className='float-right update-button' variant='light' style={{ color: 'white', background: '#4d65ff' }}>Update</Button>
                }>
                  <form className='side-by-side'>
                    <input type='text' placeholder='New username' name='username' />
                    <input type='submit' value='Submit' />
                  </form>
                </UnopDropdown>
              </div>
            </div>

            <div className='user-email'>
              <span className='title'>Email: </span>
              <span className='value'>{`${this.state.Email}`}</span>
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
              {/* <span className='value'>{`${this.state.Password}`}</span> */}
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
              <span className='value'>{`${this.state.Birthday}`}</span>
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
            {/* <div className='user-movies'>
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
            </div> */}
          </div>

          <div className='user-section'>
            <div className='section-header'> Deregister your account: </div>
            <Button variant='danger' onClick={this.handleSubmitDelete} >Deregister</Button>
          </div>

          <Link to={`/`}>
            <Button variant='light' style={{ color: 'white', background: '#9ba9ff' }}>Home</Button>
          </Link>

        </Col>
      </Row >
    );
  }
}