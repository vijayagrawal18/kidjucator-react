import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import ReactDOM from 'react-dom';
import './styles/index.css';
import Play from './components/Play';
import Edit from './components/Edit';
import registerServiceWorker from './registerServiceWorker';

const AppRoute = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Play}/>
        <Route exact path="/edit" component={Edit}/>
      </div>
    </Router>
    );
}

ReactDOM.render(<AppRoute/>, document.getElementById('main'));
registerServiceWorker();
