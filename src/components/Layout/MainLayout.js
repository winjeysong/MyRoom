import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import FooterMsg from '../../components/FooterMsg/FooterMsg';

const { Header, Content, Footer } = Layout;

function LayoutWrapper({ content, location }) {
  const pathname = /(\/\w+)/i.exec(location.pathname); // match '/usercenter' or '/about', ant etc.
  const id = localStorage.getItem('id'); // get user id (the same as mongdb built-in _id) stored locally
  return (
    <Layout className="layout" style={{ backgroundColor: '#f8f8f8', height: '100%', minHeight: 600 }}>
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[pathname[1]]}
          style={{ lineHeight: '64px', fontSize: '1.25em' }}
        >
          <Menu.Item key="/userpost"><Link to="/userpost"><Icon type="plus-square" style={{ fontSize: '1.25em' }} />写文章</Link></Menu.Item>
          <Menu.Item key="/usercenter"><Link to={`/usercenter/${id}`}>个人中心</Link></Menu.Item>
          <Menu.Item key="/about"><Link to="/about">关于</Link></Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '20px 20px', backgroundColor: '#efefef' }}>
        <div>{content}</div>
      </Content>
      <Footer style={{ textAlign: 'center', backgroundColor: '#404040', color: '#ffffffcd', fontWeight: '200', height: 200 }}>
        <FooterMsg />
      </Footer>
    </Layout>
  );
}

export default LayoutWrapper;
