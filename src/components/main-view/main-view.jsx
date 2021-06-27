import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import './main-view.scss'

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      registered: true
    };
  }

  componentDidMount() {
    axios.get('https://getmyflix.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
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

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {
    const { movies, selectedMovie, user, registered } = this.state;

    if (!user && !registered) return <RegistrationView onRegister={(registered) => this.onRegister(registered)} onLoggedIn={user => this.onLoggedIn(user)} />; //registration view if user isn't registered
    if (!user) return <LoginView onRegister={(registered) => this.onRegister(registered)} onLoggedIn={user => this.onLoggedIn(user)} />; //login view if user isn't logged in

    if (movies.length === 0) return <div className='main-view' />;
    return (
      <Row className='main-view justify-content-md-center'>
        <Col className='headerCol' md={12}>
          <Navbar>
            <Navbar.Brand onClick={() => { this.setSelectedMovie(null) }}
              style={{ color: '#9ba9ff', fontSize: '36px' }}>myFlix</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link onClick={() => { this.setSelectedMovie(null) }}>Home</Nav.Link>
                <Nav.Link href="#link">Profile</Nav.Link>
                <NavDropdown title="Settings" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Account</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Support</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => { this.onLoggedIn(null) }}>Log Out</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form inline>
                <Form.Control type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="light" style={{ color: 'white', backgroundColor: '#4d65ff' }}>Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>
        </Col>

        {
          selectedMovie
            ? (
              <Col md={8}>
                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => {
                  this.setSelectedMovie(newSelectedMovie);
                }} />
              </Col>
            )
            :
            movies.map(movie => (
              <Col md={4}>
                <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => {
                  this.setSelectedMovie(newSelectedMovie);
                }} />
              </Col>
            ))
        }
      </Row >
    );
  }
}
