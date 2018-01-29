import React from 'react';
import { connect } from 'dva';
import Register from '../components/Register/Register';

function RegisterPage() {
  return (
    <Register />
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(RegisterPage);
