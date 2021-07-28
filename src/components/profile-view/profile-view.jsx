import axios from 'axios';
// import React, { useState } from 'react';
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button';
// import UnopDropdown from 'unop-react-dropdown';

import './profile-view.scss';

// import { Link } from "react-router-dom";

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

  // getUser(token) {
  //   let url = 'https://https://getmyflix.herokuapp.com/users/' +
  //     localStorage.getItem('user');
  //   axios.get(url, {
  //     headers: { Authorization: `Bearer ${token}` }
  //   })
  //     .then((response) => {
  //       this.setState({
  //         Username: response.data.Username,
  //         Password: response.data.Password,
  //         Email: response.data.Email,
  //         Birthday: response.data.Birthday,
  //         FavoriteMovies: response.data.FavoriteMovies
  //       });
  //     });
  // }

  getUser(token, user) {
    axios.get(`https://getmyflix.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        this.setState({
          // userData: response.data
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies
        });
        console.log(response.data)
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
    const { movies, userData } = this.props;
    console.log('line 66');
    console.log(this.props);
    console.log(this.state);

    return (
      <Row className='user-view justify-content-md-center'>
        <Col md='auto'>
          <div className='user-name'>
            {/* <div className='section-header'>Hello {`${userData.Username}`}!</div> */}
            <div className='section-header'>Hello {`${this.props.user}`}!</div>
            <div className='section-header'>Hello {`${this.state.Email}`}!</div>
          </div>

        </Col>
      </Row >
    );
  }
}