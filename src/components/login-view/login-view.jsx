// import React, { useState } from 'react';
import React from 'react';

// export function LoginView(props) {
export class LoginView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      register: null
    };
  }
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');

  // const handleSubmit = () => {
  //   // e.preventDefault();
  //   console.log(username, password);
  //   // send request to server for auth
  //   props.onLoggedIn(username);
  // };

  handleSubmit() {
    // e.preventDefault();
    console.log(username, password);
    // send request to server for auth
    props.onLoggedIn(username);
  };

  setUsername(username) {
    this.setState({
      username: username
    });
  }

  setPassword(password) {
    this.setState({
      password: password
    });
  }

  onRegister() {
    this.setState({
      register
    })
  };


  render() {

    const { username, password, register } = this.state;

    // if (register) return <RegistrationView onLoggedIn={user => this.onLoggedIn(user)}
    if (register) return <RegistrationView />

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
        <button type='submit' onClick={onRegister}>Register!</button>
      </div>
    );
  }

}
