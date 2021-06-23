import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { onLoggedIn } from '../main-view/main-view';
import { onRegister } from '../main-view/main-view';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, email, birthday, password);
    // send request to server for auth
    props.onLoggedIn(username);
  };

  return (

    <Row>
      <Col md={6}>
        <Form>
          <h1>myFlix</h1>
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
          <Button variant='primary' type='submit' onClick={handleSubmit}>Register!</Button>
          {/* <Button variant='primary' type='submit' onClick={onLoggedIn}>Register!</Button> */}
        </Form>
      </Col>
    </Row>
  );
}
