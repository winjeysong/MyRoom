import React from 'react';
import { Layout, Menu } from 'antd';
import FooterMsg from '../../components/FooterMsg/FooterMsg';

const { Header, Content, Footer } = Layout;

function LayoutWrapper({ content }) {
  return (
    <Layout className="layout" style={{ backgroundColor: '#f8f8f8', height: '100%' }}>
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
        <div style={{ padding: '100px 24px 100px' }}>{content}</div>
      </Content>
      <Footer style={{ textAlign: 'center', backgroundColor: '#404040', color: '#ffffffcd', fontWeight: '200', height: '22%' }}>
        <FooterMsg />
      </Footer>
    </Layout>
  );
}

export default LayoutWrapper;
