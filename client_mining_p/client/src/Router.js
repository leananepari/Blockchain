import React from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from './components/Login';
import Main from './components/Main';

function Router() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/login" render={props => <Login {...props} />} />
          <Route exact path="/" component={Main} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Router;