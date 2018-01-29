import React from 'react';
import { connect } from 'dva';
import Login from '../components/Login/Login';
import Layout from '../components/Layout/Layout';

function LoginPage() {
  const content = <Login />;
  return (
    <Layout content={content} />
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(LoginPage);
