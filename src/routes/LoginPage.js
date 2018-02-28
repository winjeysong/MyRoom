import React from 'react';
import { connect } from 'dva';
import Login from '../components/Login/Login';
import BlurLayout from '../components/Layout/BlurLayout';

function LoginPage() {
  const content = <Login />;
  return (
    <BlurLayout content={content} />
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(LoginPage);
