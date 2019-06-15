import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/misc/Home';
import Login from './components/auth/Login';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-12">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
