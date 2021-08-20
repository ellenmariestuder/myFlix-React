import React, { useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { onLoggedIn } from '../main-view/main-view';
import { onRegister } from '../main-view/main-view';

import './registration-view.scss';
import axios from 'axios';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://getmyflix.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self');
      })
      .catch(e => {
        console.log('error registering user')
      });
  };

  return (

    <Row>
      <Col md={6}>
        <Form>
          <h1 className='header'>myFlix</h1>
          <h2>Create an Account</h2>
          <Form.Group controlId='formUsername'>
            <Form.Label>Username:</Form.Label>
            <Form.Control type='text' onChange={e => setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group controlId='formEmail'>
            <Form.Label>Email:</Form.Label>
            <Form.Control type='email' onChange={e => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group controlId='formBirthday'>
            <Form.Label>Birthday:</Form.Label>
            <Form.Control type='date' onChange={e => setBirthday(e.target.value)} />
          </Form.Group>
          <Form.Group controlId='formPassword'>
            <Form.Label>Password:</Form.Label>
            <Form.Control type='password' onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          <Button variant='light' type='submit' onClick={handleSubmit}
            style={{ color: 'white', background: '#9ba9ff', outlineColor: 'white' }}>Register!</Button>
          {/* <Button variant='primary' type='submit' onClick={onLoggedIn}>Register!</Button> */}
        </Form>
      </Col>
    </Row>
  );
}
