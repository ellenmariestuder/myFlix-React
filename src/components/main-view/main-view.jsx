import React from 'react';
import axios from 'axios';
import { Row, Col, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { UserView } from '../profile-view/profile-view';

import './main-view.scss'


class MainView extends React.Component {

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.props.setUser(localStorage.getItem('user'));
      this.getMovies(accessToken);
      this.getUser(accessToken);
      this.getAcc(accessToken);
    }
    console.log('component did mount');
    console.log('component mount user: ' + this.props.user)
  }

  getMovies(token) {
    axios.get('https://getmyflix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUser(token) {
    axios.get('https://getmyflix.herokuapp.com/users/${user}', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          userData: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.props.setUser(authData.user.Username);
    // this.setState({ user: authData.user.Username }) //trying this-- 12/23/21
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.props.setUser('');
  }

  getAcc(token, user) {
    axios.get(`https://getmyflix.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          userData: response.data
        });
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log('success getting user');
  }

  render() {
    let { movies, user } = this.props;
    // let { user } = this.state;
    console.log('render, L94 ' + user);

    return (
      <Router>

        <Row className='main-view justify-content-md-center'>

          <Route exact path='/' render={() => {
            if (!user.length) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className='main-view' />;
            return <Col>
              <Col className='headerCol' md={12}>
                <Navbar >
                  <Navbar.Brand href='/' style={{ color: '#9ba9ff', fontSize: '36px' }}>myFlix</Navbar.Brand>
                  <Navbar.Toggle aria-controls='basic-navbar-nav' />
                  <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='mr-auto'>
                      <Nav.Link href='/'>Home</Nav.Link>
                      <Nav.Link href={`/users/${user}`}>Profile</Nav.Link>
                      <NavDropdown title='Settings' id='basic-nav-dropdown'>
                        <NavDropdown.Item href='#action/'>Support</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => { this.onLoggedOut() }}>Log Out</NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
              </Col>
              <Row>
                <MoviesList movies={movies} />;
              </Row>
            </Col>
          }} />

          <Route path='/register' render={() => {
            return <Col> <RegistrationView /> </Col>
          }} />

          <Route path='/movies/:movieId' render={({ match, history }) => {
            if (!user.length) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            return <Col>
              <Col className='headerCol' md={12}>
                <Navbar >
                  <Navbar.Brand href='/' style={{ color: '#9ba9ff', fontSize: '36px' }}>myFlix</Navbar.Brand>
                  <Navbar.Toggle aria-controls='basic-navbar-nav' />
                  <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='mr-auto'>
                      <Nav.Link href='/'>Home</Nav.Link>
                      <Nav.Link href={`/users/${user}`}>Profile</Nav.Link>
                      <NavDropdown title='Settings' id='basic-nav-dropdown'>
                        <NavDropdown.Item href='#action/'>Support</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => { this.onLoggedOut() }}>Log Out</NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
              </Col>
              <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
            </Col>
          }} />

          <Route path='/genre/:name' render={({ match, history }) => {
            if (!user.length) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className='main-view' />;
            return <Col>
              <Col className='headerCol' md={12}>
                <Navbar >
                  <Navbar.Brand href='/' style={{ color: '#9ba9ff', fontSize: '36px' }}>myFlix</Navbar.Brand>
                  <Navbar.Toggle aria-controls='basic-navbar-nav' />
                  <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='mr-auto'>
                      <Nav.Link href='/'>Home</Nav.Link>
                      <Nav.Link href={`/users/${user}`}>Profile</Nav.Link>
                      <NavDropdown title='Settings' id='basic-nav-dropdown'>
                        <NavDropdown.Item href='#action/'>Support</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => { this.onLoggedOut() }}>Log Out</NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
              </Col>
              <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
              </Col>
            </Col>
          }} />

          <Route path='/director/:name' render={({ match, history }) => {
            if (!user.length) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className='main-view' />;
            return <Col>
              <Col className='headerCol' md={12}>
                <Navbar >
                  <Navbar.Brand href='/' style={{ color: '#9ba9ff', fontSize: '36px' }}>myFlix</Navbar.Brand>
                  <Navbar.Toggle aria-controls='basic-navbar-nav' />
                  <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='mr-auto'>
                      <Nav.Link href='/'>Home</Nav.Link>
                      <Nav.Link href={`/users/${user}`}>Profile</Nav.Link>
                      <NavDropdown title='Settings' id='basic-nav-dropdown'>
                        <NavDropdown.Item href='#action/'>Support</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => { this.onLoggedOut() }}>Log Out</NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
              </Col>
              <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
              </Col>
            </Col>
          }} />

          <Route path='/users/:Username' render={({ history }) => {
            if (!user.length) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className='main-view' />;
            return (
              <Col>
                <Col className='headerCol' md={12}>
                  <Navbar >
                    <Navbar.Brand href='/' style={{ color: '#9ba9ff', fontSize: '36px' }}>myFlix</Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                      <Nav className='mr-auto'>
                        <Nav.Link href='/'>Home</Nav.Link>
                        <Nav.Link href={`/users/${user}`}>Profile</Nav.Link>
                        <NavDropdown title='Settings' id='basic-nav-dropdown'>
                          <NavDropdown.Item href='#action/'>Support</NavDropdown.Item>
                          <NavDropdown.Item onClick={() => { this.onLoggedOut() }}>Log Out</NavDropdown.Item>
                        </NavDropdown>
                      </Nav>
                    </Navbar.Collapse>
                  </Navbar>
                </Col>
                <Col md={8}>
                  <UserView user={this.props.userData} userData={this.props.userData} movies={movies} onBackClick={() => history.goBack()} />
                </Col>
              </Col>
            )
          }} />

        </Row>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return {
    movies: state.movies,
    user: state.user
  }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);
