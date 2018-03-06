import React from 'react';
import { Icon, Card, Row, Col } from 'antd';
import marked from 'marked';
import highlight from 'highlight.js';
import styles from './InfoWrapper.css';

highlight.configure({
  tabReplace: '  ',
  classPrefix: 'hljs-',
  languages: ['CSS', 'HTML, XML', 'JavaScript', 'PHP', 'Python', 'Stylus', 'TypeScript', 'Markdown'],
});

marked.setOptions({
  highlight(code) {
    return highlight.highlightAuto(code).value;
  },
  sanitize: true,
});

function InfoWrapper({ info, posts }) {
  const postsList = posts.map((post, index) => {
    return (
      <Card key={index} title={post.title} bordered={false} className={styles['post-card']}>
        <div className={styles['post-content']}>{<div dangerouslySetInnerHTML={{ __html: marked(post.content) }} />}</div>
      </Card>
    );
  });

  return (
    <div className={styles.normal}>
      <Row>
        <Col xs={24} sm={24} md={{ span: 14, offset: 1 }}>
          <h1>{info.username ? `欢迎回来，${info.username}` : 'No Data.'}</h1>
        </Col>
      </Row>
      <Row gutter={32}>
        <Col xs={24} sm={24} md={{ span: 14, offset: 1 }}>
          {postsList}
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Card title="个人资料" bordered={false} className={styles.card}>
            <ul className={styles['list-wrapper']}>
              <li className={styles.list}>
                <span className={styles['info-key']}><Icon type="user" />用户名</span>
                <span className={styles['info-value']}>{info.username}</span>
              </li>
              <li className={styles.list}>
                <span className={styles['info-key']}><Icon type="mail" />邮箱</span>
                <span className={styles['info-value']}>{info.email}</span>
              </li>
              <li className={styles.list}>
                <span className={styles['info-key']}><Icon type="mobile" />手机</span>
                <span className={styles['info-value']}>{info.cellphone}</span>
              </li>
              <li className={styles.list}>
                <span className={styles['info-key']}><Icon type="link" />个人主页</span>
                <span className={styles['info-value']}>{info.website || '暂无'}</span>
              </li>
              <li className={styles.list}>
                <span className={styles['info-key']}><Icon type="environment-o" />所在地</span>
                <span className={styles['info-value']}>{info.residence}</span>
              </li>
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default InfoWrapper;
