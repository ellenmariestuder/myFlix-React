import React from 'react';
import axios from 'axios';
import { Row, Col, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import { connect } from 'react-redux';
import { setMovies, loginUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { UserView } from '../profile-view/profile-view';

import './main-view.scss'


class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      user: null,
      token: null,
      // movies: [],
      // selectedMovie: null,
      userData: null,
      registered: true
    };
  }
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      console.log('component did mount');
      this.getMovies(accessToken);
      this.getUser(accessToken);
      this.getAcc(accessToken);
    }
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
    // this.props.loginUser(authData.user.Username);
    this.setState({
      user: authData.user.Username,
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

  onRegister() {
    this.setState({
      registered: false
    });
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

    let { movies } = this.props;
    let { user, registered, userData } = this.state;

    if (!user && !registered) return <Row>
      <Col>
        <RegistrationView onRegister={(registered) => this.onRegister(registered)} onLoggedIn={user => this.onLoggedIn(user)} />
      </Col>
    </Row>

    if (!user) return <Col>
      <LoginView onRegister={(registered) => this.onRegister(registered)} onLoggedIn={user => this.onLoggedIn(user)} />
    </Col>

    return (
      <Router>
        <Row className='main-view justify-content-md-center'>

          <Col className='headerCol' md={12}>
            <Navbar >
              <Navbar.Brand href='/' style={{ color: '#9ba9ff', fontSize: '36px' }}>myFlix</Navbar.Brand>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav'>

                {/* <Nav className='mr-auto' style={{ display: 'flex', margin: 'auto' }}> */}
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


          <Route exact path='/' render={() => {
            if (movies.length === 0) return <div className='main-view' />;
            return <MoviesList movies={movies} />;
          }} />

          <Route path='/movies/:movieId' render={({ match, history }) => {
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path='/genre/:name' render={({ match, history }) => {
            if (movies.length === 0) return <div className='main-view' />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path='/director/:name' render={({ match, history }) => {
            if (movies.length === 0) return <div className='main-view' />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path='/users/:Username' render={({ history }) => {
            if (movies.length === 0) return <div className='main-view' />;
            return (
              <Col md={8}>
                <UserView user={user} userData={userData} movies={movies} onBackClick={() => history.goBack()} />
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

export default connect(mapStateToProps, { setMovies, loginUser })(MainView);
