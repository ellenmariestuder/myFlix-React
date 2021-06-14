import React, { useState } from 'react';

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
    console.log('register');
    // send request to server for auth
    props.onRegister();
  };

  return (
    <div>
      <form>
        <div>
          <h1>Login!</h1>
          <label>
            Username:
            <input type='text' value={username} onChange={
              e => setUsername(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input type='text' value={password} onChange={
              e => setPassword(e.target.value)} />
          </label>
        </div>
        <button type='submit' onClick={handleSubmit}>Submit</button>
      </form>
      <h2>Don't have an account yet?</h2>
      <button type='submit' onClick={handleRegister}>Register!</button>
    </div>
  );
}

