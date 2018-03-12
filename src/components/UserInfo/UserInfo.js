/**
 * async data render
 * refer to https://github.com/facebook/react/pull/8098
 */

import React from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { Message } from 'antd';
import styles from './UserInfo.css';
import InfoWrapper from '../InfoWrapper/InfoWrapper';

const token = localStorage.getItem('token');

class UserInfo extends React.Component {
  static fetchPost(id) {
    return axios({
      method: 'post',
      url: `/api/post/search/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 1000,
    });
  }

  static fetchInfo(id) {
    return axios({
      method: 'post',
      url: `/api/user/id/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 1000,
    });
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
      .then(axios.spread((infoRes, postsRes) => {
        if (infoRes.data.username && postsRes.data[0].content) {
          this.setState({
            info: infoRes.data,
            posts: postsRes.data,
          });
        } else if (infoRes.data.msg && postsRes.data.msg) {
          Message.error(infoRes.data.msg);
          setTimeout(() => {
            location.href = '/login';
          }, 2000);
        }
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
