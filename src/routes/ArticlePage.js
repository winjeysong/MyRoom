import React from 'react';
import { connect } from 'dva';
import ArticlePageComponent from '../components/ArticlePage/ArticlePage';
import MainLayout from '../components/Layout/MainLayout';

function ArticlePage(props) {
  const { postid } = props.match.params;
  const { location } = props.history;
  const content = <ArticlePageComponent postId={postid} />;
  return (
    <MainLayout content={content} location={location} />
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(ArticlePage);
