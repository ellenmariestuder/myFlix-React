import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://getmyflix.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
  };

  return (
    <Row>
      <Col md={6}>
        <Form>
          <h1 className='header'>myFlix</h1>
          <h2>Login</h2>
          <Form.Group controlId='formUsername'>
            <Form.Label>Username:</Form.Label>
            <Form.Control type='text' onChange={e => setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group controlId='formPassword'>
            <Form.Label>Password:</Form.Label>
            <Form.Control type='password' onChange={e => setPassword(e.target.value)} />
          </Form.Group>

          <Button variant='light' type='submit' onClick={handleSubmit}
            style={{ color: 'white', background: '#9ba9ff' }}>Submit</Button>

          <h4 className='registerTitle'>Don't have an account yet?</h4>
          <Link to={`/register`}>
            <Button variant='light'
              style={{ color: 'white', background: '#9ba9ff' }}>Register!</Button>
          </Link>

        </Form>
      </Col>
    </Row>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired
}