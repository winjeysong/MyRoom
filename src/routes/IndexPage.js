import React from 'react';
import { connect } from 'dva';
import Welcome from '../components/Welcome/Welcome';

function IndexPage() {
  return (
    <Welcome />
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
