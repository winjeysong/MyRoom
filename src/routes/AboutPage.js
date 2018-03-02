import React from 'react';
import { connect } from 'dva';
import About from '../components/About/About';
import MainLayout from '../components/Layout/MainLayout';

function AboutPage({ location }) {
  const content = <About />;
  return (
    <MainLayout content={content} location={location} />
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(AboutPage);
