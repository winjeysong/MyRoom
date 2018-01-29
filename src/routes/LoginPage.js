import React from 'react';
import { connect } from 'dva';
import Login from '../components/Login/Login';

function LoginPage() {
  return (
    <Login />
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(LoginPage);
