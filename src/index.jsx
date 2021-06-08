import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

// Main component
class MyFlixApplication extends React.Component {
  render() {
    return (
      <div className='my-flix'>
        <div>Good morning</div>
      </div>
    );
  }
}

// Find root of app
const container = document.getElementsByClassName('app-container')[0];

// Tell React to render app in root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
