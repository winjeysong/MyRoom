import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import LoginPage from './routes/LoginPage.js';
import RegisterPage from './routes/RegisterPage.js';
import UserCenter from './routes/UserCenter.js';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route exact path="/Login" component={LoginPage} />
        <Route exact path="/Register" component={RegisterPage} />
        <Route exact path="/UserCenter/:id" component={UserCenter} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
