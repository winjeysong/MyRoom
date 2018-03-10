import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import LoginPage from './routes/LoginPage.js';
import RegisterPage from './routes/RegisterPage.js';
import UserCenter from './routes/UserCenter.js';
import AboutPage from './routes/AboutPage.js';
import UserPost from './routes/UserPost.js';
import ArticlePage from './routes/ArticlePage.js';
import InfoPage from './routes/InfoPage.js';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route exact path="/Login" component={LoginPage} />
        <Route exact path="/Register" component={RegisterPage} />
        <Route exact path="/UserCenter/:id" component={UserCenter} />
        <Route exact path="/About" component={AboutPage} />
        <Route exact path="/UserPost" component={UserPost} />
        <Route exact path="/Article/:postid" component={ArticlePage} />
        <Route path="/usermodify/:id" component={InfoPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
