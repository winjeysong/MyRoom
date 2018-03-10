import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import FooterMsg from '../../components/FooterMsg/FooterMsg';
import styles from './MainLayout.less';

const { Header, Content, Footer } = Layout;
const { SubMenu, ItemGroup } = Menu;

function LayoutWrapper({ content, location }) {
  const pathname = /(\/\w+)/i.exec(location.pathname); // match '/usercenter' or '/about', and etc.
  const id = localStorage.getItem('id'); // get user id (the same as mongdb built-in _id) stored locally
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <span className={styles.logo}><Link to="/" className={styles.link}>My Room</Link></span>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[pathname[1]]}
          style={{ lineHeight: '64px', fontSize: '1.25em' }}
        >
          <Menu.Item key="/usercenter"><Link to={`/usercenter/${id}`}><Icon type="smile" />个人中心</Link></Menu.Item>
          <SubMenu title={<span><Icon type="setting" />操作</span>}>
            <ItemGroup title="文章">
              <Menu.Item key="/userpost"><Link to="/userpost"><Icon type="file-add" />新建</Link></Menu.Item>
            </ItemGroup>
            <ItemGroup title="用户">
              <Menu.Item key="/usermodify"><Link to={`/usermodify/${id}`}><Icon type="edit" />资料修改</Link></Menu.Item>
            </ItemGroup>
          </SubMenu>
          <Menu.Item key="/about"><Link to="/about"><Icon type="info-circle-o" />关于</Link></Menu.Item>
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
