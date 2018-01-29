import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import LoginPage from './routes/LoginPage.js';
import RegisterPage from './routes/RegisterPage.js';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/Login" component={LoginPage} />
        <Route path="/Register" component={RegisterPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
