import React from 'react';
import { Layout } from 'antd';
import { Link } from 'dva/router';
import styles from './BlurLayout.css';

const { Header, Content } = Layout;

function BlurLayoutWrapper({ content }) {
  return (
    <div className={styles.normal}>
      <div className={styles.background} />
      <Layout className={styles.layout}>
        <Header className={styles.header}>
          <div className="logo" />
          <Link to="/" style={{ color: '#eaeaea' }}>Welcome to My Room.</Link>
        </Header>
        <Content style={{ height: '100%', padding: '35px 30px' }}>
          <div className={styles.content}>{content}</div>
        </Content>
      </Layout>
    </div>
  );
}

export default BlurLayoutWrapper;
