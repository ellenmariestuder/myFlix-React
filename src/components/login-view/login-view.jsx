import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // send request to server for auth
    props.onLoggedIn(username);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('registered');
    // send request to server for auth
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
