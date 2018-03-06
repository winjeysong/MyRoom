/**
 * async data render
 * refer to https://github.com/facebook/react/pull/8098
 */

import React from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import styles from './UserInfo.css';
import InfoWrapper from '../InfoWrapper/InfoWrapper';

class UserInfo extends React.Component {
  static fetchPost(id) {
    return axios.post(`/api/post/search/${id}`, { timeout: 1000 });
  }

  static fetchInfo(id) {
    return axios.post(`/api/user/id/${id}`, { timeout: 1000 });
  }

  constructor(props) {
    super(props);
    this.state = {
      info: {},
      posts: [],
    };
  }

  componentDidMount() {
    this.fetchAll(this.props.id);
  }

  fetchAll(id) {
    axios.all([UserInfo.fetchInfo(id), UserInfo.fetchPost(id)])
      .then(axios.spread((info, posts) => {
        console.log(posts, info);
        this.setState({
          info: info.data,
          posts: posts.data,
        });
      }));
  }

  render() {
    const { info, posts } = this.state;
    return (
      <div className={styles.normal}>
        <InfoWrapper info={info} posts={posts} />
      </div>
    );
  }
}

UserInfo.propTypes = {
  id: propTypes.string.isRequired,
};

export default UserInfo;
