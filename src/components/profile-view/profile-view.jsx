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
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
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

  handleSubmit(e) {
    // console.log('click click');
    // e.preventDefault();

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    let data = JSON.stringify({
      Username: this.state.Username,
      Password: this.state.Password,
      Email: this.state.Email,
      Birthday: this.state.Birthday
    });

    var config = {
      method: 'put',
      url: `https://getmyflix.herokuapp.com/users/${user}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      data: data
    }

    axios(config)
      .then((response) => {
        console.log(response.data)
        console.log(JSON.stringify(response.data));
        alert('Changes saved!');

        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies
        })
        localStorage.setItem('user', response.data.Username);
        window.open(`/users/${response.data.Username}`, '_self');
      })
      .catch(function (error) {
        console.log('error updating user', error);
        console.error(error.response.data);
      });
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

  handleRemove(movie) {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    console.log(`https://getmyflix.herokuapp.com/users/${user}/Movies/${movie._id}`)
    axios.delete(`https://getmyflix.herokuapp.com/users/${user}/Movies/${movie._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        alert('Movie was removed');
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  renderModal() {
    console.log("the link was clicked.")

    return (
      <div className="modal-show">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Update user info</h5>

              <button type="button" className="close" data-dismiss="modal"
                aria-label="Close" onClick={() => this.setState({ showModal: false })}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Form>
                <Form.Group controlId='formUsername'>
                  <Form.Label>New Username:</Form.Label>
                  <Form.Control name='Username' type='text' onChange={(e) =>
                    this.setState({ Username: e.target.value })} />
                </Form.Group>
                <Form.Group controlId='formEmail'>
                  <Form.Label>New Email:</Form.Label>
                  <Form.Control name='Email' type='email' onChange={(e) =>
                    this.setState({ Email: e.target.value })} />
                </Form.Group>
                <Form.Group controlId='formBirthday'>
                  <Form.Label>New Birthday:</Form.Label>
                  <Form.Control name='Birthday' type='date' onChange={(e) =>
                    this.setState({ Birthday: e.target.value })} />
                </Form.Group>
                <Form.Group controlId='formPassword'>
                  <Form.Label>New Password:</Form.Label>
                  <Form.Control name='Password' type='password' onChange={(e) =>
                    this.setState({ Password: e.target.value })} />
                </Form.Group>
              </Form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-
                dismiss="modal" onClick={() => this.setState({ showModal: false })}>
                Cancel</button>
              <button onClick={() => this.handleSubmit()}
                type="button" className="btn btn-primary"
                variant='light' style={{ color: 'white', backgroundColor: '#4d65ff' }}>
                Save changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { movies } = this.props;
    const favoritesList = movies.filter(m => {
      return this.state.FavoriteMovies.includes(m._id);
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
                {favoritesList
                  .map(movie => <div key={movie._id}> {movie.Title} {" "}
                    <Button variant='outline-danger' onClick={() => this.handleRemove(movie)} >x</Button>
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
            <Button variant='light' style={{ color: 'white', background: '#9ba9ff' }} size='lg'>Home</Button>
          </Link>

        </Col>
      </Row >
    );
  }
}