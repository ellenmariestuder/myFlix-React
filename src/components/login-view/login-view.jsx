import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/actions';

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

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('registered');
    props.onRegister(false);
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
          <Button variant='light' type='submit' onClick={handleRegister}
            style={{ color: 'white', background: '#9ba9ff' }}>Register!</Button>
        </Form>
      </Col>
    </Row>
  );
}

let mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, { loginUser })(LoginView);