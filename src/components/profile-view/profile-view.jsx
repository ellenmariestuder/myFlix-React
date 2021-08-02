import axios from 'axios';
// import React, { useState } from 'react';
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import UnopDropdown from 'unop-react-dropdown';

import './profile-view.scss';

import { Link } from "react-router-dom";

export class UserView extends React.Component {
  constructor() {
    super();
    this.state = {
      // username: null,
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: []
      // validated: null
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

  setField(e) {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  handleUpdate(e) {
    // e.preventDefault();
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    axios.put(`https://getmyflix.herokuapp.com/users/${localStorage.getItem('user')}`, {
      Username: this.state.Username,
      Password: this.state.Password,
      Email: this.state.Email,
      Birthday: this.state.Birthday

      // Username: Username
      // Username: username
      // Password: password,
      // Email: email,
      // Birthday: birthday
    },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        const data = response.data;
        console.log(data);
        alert(user + ' has been updated.');
        window.open('{`/users/${this.props.user}`}', '_self');
      })
      .catch(e => {
        console.log('error updating user')
      });
    // console.log(username, email, birthday, password);
    // props.onLoggedIn(username);
  };

  handleDelete() {
    const answer = window.confirm('Are you sure? This cannot be undone.');
    if (answer) {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      axios.delete(`https://getmyflix.herokuapp.com/users/${localStorage.getItem('user')}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
        .then(() => {
          alert(user + ' has been deleted.');
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          window.location.pathname = '/';
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      // Do Nothing
      console.log('That was a close one');
    }
  }

  handleRemove() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    axios.delete(`https://getmyflix.herokuapp.com/users/${user}/Movies/${FavoriteMovies._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        alert('Movie was removed');
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      })
    // .then(() => window.location.reload());
  }



  render() {
    // const { movies, FavoriteMovies } = this.props;
    const { movies } = this.props;
    const favoritesList = movies.filter(m => {
      return this.state.FavoriteMovies.includes(m._id);
      // return this.state.FavoriteMovies;
    });
    console.log('line 66');
    console.log(this.props);
    console.log(this.state);

    return (
      <Row className='user-view justify-content-md-center'>
        <Col md='12'>

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
                    <input type='text' placeholder='New username' name='Username' onChange={(e) => this.setField(e)} />
                    <input type='submit' value='Submit' onSubmit={(e) => this.handleUpdate(e)} />
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
                    <input type="text" placeholder='New email' name="email" />
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
                    <input type="text" placeholder='New birthday' name="birthday" />
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
                {this.state.FavoriteMovies
                  // .map(t => <div>{t}</div>)
                  .map(t => <div>{t} {" "}
                    <Button variant='outline-danger' onClick={() => this.handleRemove(t)} >x</Button>
                  </div>)
                }
              </div>
            </div>
          </div>

          <div className='user-section'>
            <div className='section-header'> Deregister your account: </div>
            <Button variant='danger' onClick={() => this.handleDelete()} >Deregister</Button>
          </div>

          <Link to={`/`}>
            <Button variant='light' style={{ color: 'white', background: '#9ba9ff' }}>Home</Button>
          </Link>

        </Col>
      </Row >
    );
  }
}