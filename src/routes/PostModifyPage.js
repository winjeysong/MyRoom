import React from 'react';
import { connect } from 'dva';
import PostModify from '../components/PostModify/PostModify';
import MainLayout from '../components/Layout/MainLayout';

function PostModifyPage(props) {
  const { postid } = props.match.params;
  const { location } = props.history;
  const content = <PostModify postId={postid} />;
  return (
    <MainLayout content={content} location={location} />
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(PostModifyPage);
