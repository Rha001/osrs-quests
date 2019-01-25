import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// components
import Quests from "./components/quests/Quests";
import About from './components/about/About';

// TODO: Do some tests, improve quest details.

class App extends Component {
  render = () => {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/quests">Quests</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">About</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Route exact path="/" component={Quests} />
          <Route exact path="/quests" component={Quests} />
          <Route exact path="/about" component={About} />
          
        </div>
      </Router>
    );
  }
}

export default App;
