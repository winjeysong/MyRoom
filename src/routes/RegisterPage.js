import React from 'react';
import { connect } from 'dva';
import Register from '../components/Register/Register';
import Layout from '../components/Layout/Layout';

function RegisterPage() {
  const content = <Register />;
  return (
    <Layout content={content} />
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(RegisterPage);
