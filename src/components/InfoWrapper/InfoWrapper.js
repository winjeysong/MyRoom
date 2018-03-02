import React from 'react';
import { Icon, Card, Row, Col } from 'antd';
import styles from './InfoWrapper.css';

function InfoWrapper({ info }) {
  // const list = [];
  // for (const key in info) {
  //   const row = (<li className={styles.list} key={key}></li>);
  //   if (key !== 'id') {
  //     list.push()
  //   }
  // }

  return (
    <div className={styles.normal}>
      <h1>欢迎回来，{info.username || '用户'}。</h1>
      <Row gutter={24}>
        <Col xs={24} sm={12} md={8}>
          <Card title="用户信息" bordered={false} className={styles.card}>
            <div className={styles['list-wrapper']}>
              <ul className={styles['key-list']}>
                <li className={styles.list}><Icon type="user" />用户名</li>
                <li className={styles.list}><Icon type="mail" />邮箱</li>
                <li className={styles.list}><Icon type="mobile" />手机</li>
                <li className={styles.list}><Icon type="link" />个人主页</li>
                <li className={styles.list}><Icon type="environment-o" />所在地</li>
              </ul>
              <ul className={styles['val-list']}>
                <li className={styles.list}>{info.username}</li>
                <li className={styles.list}>{info.email}</li>
                <li className={styles.list}>{info.cellphone}</li>
                <li className={styles.list}>{info.website}</li>
                <li className={styles.list}>{info.residence}</li>
              </ul>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={{ span: 14, offset: 2 }}>
          <Card title="用户信息" bordered={false} className={styles.card} />
        </Col>
        <Col xs={24} sm={24} md={24}>
          <Card title="用户信息" bordered={false} className={styles.card} />
        </Col>
      </Row>
      <Row gutter={32}>
        <Col xs={24} sm={12} md={14}>
          <Card title="用户信息" bordered={false} className={styles.card} />
        </Col>
        <Col xs={24} sm={12} md={10}>
          <Card title="用户信息" bordered={false} className={styles.card} />
        </Col>
      </Row>
    </div>
  );
}

export default InfoWrapper;
