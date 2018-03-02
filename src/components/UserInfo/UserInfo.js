/**
 * async data render
 * refer to https://github.com/facebook/react/pull/8098
 */

import React from 'react';
import fetch from 'dva/fetch';
import propTypes from 'prop-types';
import styles from './UserInfo.css';
import InfoWrapper from '../InfoWrapper/InfoWrapper';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
    };
  }

  componentDidMount() {
    this.fetchInfo(this.props.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.fetchInfo(this.props.id);
    }
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  fetchInfo(id) {
    fetch(`/api/user/id/${id}`, {
      method: 'GET',
      credentials: 'same-origin',
    })
      .then((res) => {
        if (res.status >= 400) {
          console.error('Bad response from server');
        }
        res.json().then((info) => {
          this.fetchInfoSuccess(id, info);
        });
      });
  }

  fetchInfoSuccess(id, data) {
    if (this.isUnmounted || id !== this.props.id) {
      return;
    }
    this.setState({ info: data });
  }

  render() {
    const list = [];
    const { info } = this.state;
    for (const key in info) {
      if (key !== '_id') {
        list.push(<li className={styles.list} key={key}>{`${key}: ${info[key]}`}</li>);
      }
    }

    return (
      <div className={styles.normal}>
        <InfoWrapper info={info} />
      </div>
    );
  }
}

UserInfo.propTypes = {
  id: propTypes.string.isRequired,
};

export default UserInfo;
