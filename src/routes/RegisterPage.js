import React from 'react';
import { connect } from 'dva';
import Register from '../components/Register/Register';
import BlurLayout from '../components/Layout/BlurLayout';

function RegisterPage() {
  const content = <Register />;
  return (
    <BlurLayout content={content} />
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(RegisterPage);
