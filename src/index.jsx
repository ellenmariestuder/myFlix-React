import React from 'react';
import ReactDOM from 'react-dom';
import { MainView } from './components/main-view/main-view';
import './index.scss';
import Container from 'react-bootstrap/Container';

// Main component
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container>
        <MainView />
      </Container>
    );
  }
}

// Find root of app
const container = document.getElementsByClassName('app-container')[0];

// Tell React to render app in root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
