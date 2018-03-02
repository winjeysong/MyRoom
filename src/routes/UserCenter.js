import React from 'react';
import { connect } from 'dva';
import UserInfo from '../components/UserInfo/UserInfo';
import MainLayout from '../components/Layout/MainLayout';

function UserCenter(props) {
  // react-router props: match.params with URL param /:id in routers
  const { id } = props.match.params;
  const content = <UserInfo id={id} />;
  return (
    <MainLayout content={content} />
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(UserCenter);
