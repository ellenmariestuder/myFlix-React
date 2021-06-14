import React, { useState } from 'react';
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
    // props.onRegister(username);
  };

  return (
    <form>
      <div>
        <label>
          Username:
          <input type='text' value={username} onChange={
            e => setUsername(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input type='text' value={email} onChange={
            e => setEmail(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Birthday:
          <input type='text' value={birthday} onChange={
            e => setBirthday(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type='text' value={password} onChange={
            e => setPassword(e.target.value)} />
        </label>
      </div>
      <button type='submit' onClick={onLoggedIn}>Register!</button>
    </form>
  );
}
