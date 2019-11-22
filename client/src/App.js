import React from 'react';
import logo from './logo.svg';
import './App.css';
import FridgeApi from './services/fridge';

class App extends React.Component {
  fridgeApi;

  constructor(props) {
    super(props);
    this.state = { apiResponse: '' };
    this.fridgeApi = new FridgeApi();
  }

  callAPI() {}

  componentWillMount() {
    const config = this.fridgeApi.config;
    console.log(this.fridgeApi);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <p className="App-intro">{this.state.apiResponse}</p>
      </div>
    );
  }
}

export default App;
