import axios from 'axios';
import React, { useState } from 'react';
import React from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import Modal from 'react-modal';
// import UnopDropdown from 'unop-react-dropdown';

import './profile-view.scss';

import { Link } from "react-router-dom";

export class UserView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // username: null,
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
      // validated: null
      showModal: null
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

  // handleUpdate(e) {
  handleSubmit(e) {
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
    axios.delete(`https://getmyflix.herokuapp.com/users/${user}/Movies/${user.FavoriteMovies._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      // axios.post(`https://getmyflix.herokuapp.com/users/${user}/Movies/` +
      //   movie._id, {},
      //   {
      //     headers: { Authorization: `Bearer ${token}` }
      //   })
      .then(() => {
        alert('Movie was removed');
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      })
    // .then(() => window.location.reload());
  }

  renderModal() {
    // console.log("the link " + this.props.url + " was clicked.")
    console.log("the link was clicked.")

    return (
      <div className="modal-show">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Update User Info</h5>

              <button type="button" className="close" data-dismiss="modal"
                aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Form>
                <Form.Group controlId='formUsername'>
                  <Form.Label>New Username:</Form.Label>
                  <Form.Control type='text' onChange={e => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='formEmail'>
                  <Form.Label>New Email:</Form.Label>
                  <Form.Control type='email' onChange={e => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='formBirthday'>
                  <Form.Label>New Birthday:</Form.Label>
                  <Form.Control type='date' onChange={e => setBirthday(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='formPassword'>
                  <Form.Label>New Password:</Form.Label>
                  <Form.Control type='password' onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                {/* <Button variant='light' type='submit' onClick={handleSubmit} */}
                <Button variant='light' type='submit'
                  style={{ color: 'white', background: '#9ba9ff', outlineColor: 'white' }}>Update</Button>
                {/* <Button variant='primary' type='submit' onClick={onLoggedIn}>Register!</Button> */}
              </Form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-
                dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save
                changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    // const { movies, FavoriteMovies } = this.props;
    const { movies } = this.props;

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
            </div>

            <div className='user-email'>
              <span className='title'>Email: </span>
              <span className='value'>{`${this.state.Email}`}</span>
            </div>

            <div className='user-password'>
              <span className='title'>Password: ********</span>
              {/* <span className='value'>{`${this.state.Password}`}</span> */}
            </div>

            <div className='user-birthday'>
              <span className='title'>Birthday: </span>
              <span className='value'>{`${this.state.Birthday}`}</span>
            </div>

            <div className='user-section'>
              {/* !!!!!!! INSERT MODAL HERE !!!!!!! */}
              <a onClick={() => this.setState({ showModal: true })}>
                <Button
                  variant='light' style={{ color: 'white', background: '#9ba9ff' }}>
                  Update user info
                </Button>
              </a>
              {this.state.showModal && this.renderModal()}
            </div>
          </div>

          <div className='user-section'>
            <div className='section-header'> Your favorite movies: </div>
            <div className='user-movies'>
              <div className='value'>
                {this.state.FavoriteMovies
                  // .map(t => <div>{t}</div>)
                  .map(movie => <div>{movie} {" "}
                    <Button variant='outline-danger' onClick={() => this.handleRemove()} >x</Button>
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