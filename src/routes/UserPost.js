import React from 'react';
import { connect } from 'dva';
import UserPostComponent from '../components/UserPost/UserPost';
import MainLayout from '../components/Layout/MainLayout';

const content = <UserPostComponent />;

function UserPost({ location }) {
  return (
    <MainLayout content={content} location={location} />
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(UserPost);
