import React from 'react';
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';
import * as routes from './constants/routes';

import HomePage from './HomePage';
import UserPage from './UserPage';
import HelpPage from './Help';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="app">

          <Switch>
            <Route exact path={routes.LANDING} component={() => <HomePage />} />
            <Route exact path={routes.HELP} component={() => <HelpPage />} />
            <Route component={() => <UserPage />}/>
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;
