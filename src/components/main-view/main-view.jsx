import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { UserView } from '../profile-view/profile-view';

import './main-view.scss'

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      // selectedMovie: null,
      token: null,
      user: null,
      userData: null,
      registered: true
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    let userToken = localStorage.getItem('user');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
        token: localStorage.getItem('token')
      });
      this.getMovies(accessToken);
      this.getUser(accessToken, userToken);
    }
  }

  onRegister() {
    this.setState({
      registered: false
    });
  }

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  getMovies(token) {
    axios.get('https://getmyflix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUser(token, user) {
    axios.get(`https://getmyflix.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      // .then(user => {
      //   setUser({
      //     data: user.data,
      //     token: token
      //   }, 'refresh');
      // })
      .then(response => {
        this.setState({
          userData: response.data
        });
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movies, user, registered, userData, token } = this.state;

    if (!user && !registered) return <Row>
      <Col>
        <RegistrationView onRegister={(registered) => this.onRegister(registered)} onLoggedIn={user => this.onLoggedIn(user)} />
      </Col>
    </Row>
    if (!user) return <Row>
      <Col>
        <LoginView onRegister={(registered) => this.onRegister(registered)} onLoggedIn={user => this.onLoggedIn(user)} />
      </Col>
    </Row>

    if (movies.length === 0) return <div className='main-view' />;

    return (
      <Router>
        <Row className='main-view justify-content-md-center'>

          <Col className='headerCol' md={12}>
            <Navbar>
              <Navbar.Brand href='/' style={{ color: '#9ba9ff', fontSize: '36px' }}>myFlix</Navbar.Brand>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='mr-auto'>
                  <Nav.Link href='/'>Home</Nav.Link>
                  <Nav.Link href={`/users/${user}`}>Profile</Nav.Link>
                  <NavDropdown title='Settings' id='basic-nav-dropdown'>
                    <NavDropdown.Item href='#action/3.1'>Account</NavDropdown.Item>
                    <NavDropdown.Item href='#action/3.2'>Support</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => { this.onLoggedOut() }}>Log Out</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form inline>
                  <Form.Control type='text' placeholder='Search' className='mr-sm-2' />
                  <Button variant='light' style={{ color: 'white', backgroundColor: '#4d65ff' }}>Search</Button>
                </Form>
              </Navbar.Collapse>
            </Navbar>
          </Col>

          <Route exact path='/' render={() => {
            return movies.map(m => (
              <Col md={4} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />

          <Route path='/movies/:movieId' render={({ match, history }) => {
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path='/genre/:name' render={({ match, history }) => {
            // if (movies.length === 0) return <div className='main-view' />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path='/director/:name' render={({ match, history }) => {
            // if (movies.length === 0) return <div className='main-view' />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          {/* <Route path='/users' render={({ history }) => { */}
          <Route path={`/users/${user}`} render={({ history }) => {
            // if (movies.length === 0) return <div className='main-view' />;
            return <Col md={8}>
              <UserView
                user={user} history={history} userData={userData} token={token}
                // token={localStorage.getItem('token')}
                // onLoggedIn={user => this.onLoggedIn(user)}
                // movies={movies} user={user}
                onBackClick={() => history.goBack()} />
            </Col>
          }} />

        </Row>
      </Router>
    );
  }
}
