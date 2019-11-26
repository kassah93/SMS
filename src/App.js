import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import './assets/css/style.css';
import { Main } from './components/MainComponent';

function App() {
  return (
    <Router>
      <React.Fragment>
        <Main  />
      </React.Fragment>
    </Router>
    
  );
}

export default App;
