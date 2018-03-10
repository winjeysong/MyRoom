import React from 'react';
import { connect } from 'dva';
import InfoModify from '../components/InfoModify/InfoModify';
import MainLayout from '../components/Layout/MainLayout';

function InfoPage(props) {
  const { id } = props.match.params;
  const { location } = props.history;
  const content = <InfoModify id={id} />;
  return (
    <MainLayout content={content} location={location} />
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(InfoPage);
