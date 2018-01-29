import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import styles from './Layout.css';

const { Header, Content, Footer } = Layout;

function LayoutWrapper({ content }) {
  return (
    <Layout className="layout" style={{ backgroundColor: '#f8f8f8', minHeight: 800 }}>
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div style={{ padding: '100px 24px 300px' }}>{content}</div>
      </Content>
      <Footer style={{ textAlign: 'center', backgroundColor: '#aeaeae', color: '#ffffffcd', fontWeight: '200', height: 280 }}>
        <div className={styles['footer-wrapper']}>
          Developed with <br />
          <a href="http://2x.ant.design/index-cn" className={styles['footer-link']}><Icon className={styles['footer-icon']} type="heart" /> ANTD</a><br />
          <a href="https://github.com/dvajs/dva" className={styles['footer-link']}><Icon className={styles['footer-icon']} type="heart" /> DVA</a><br />
          <a href="http://expressjs.com/" className={styles['footer-link']}><Icon className={styles['footer-icon']} type="heart" /> EXPRESS</a><br />
          <a href="http://mongoosejs.com/" className={styles['footer-link']}><Icon className={styles['footer-icon']} type="heart" /> MONGOOSE</a>
        </div>
       a demo of @winjeysong
      </Footer>
    </Layout>
  );
}

export default LayoutWrapper;
