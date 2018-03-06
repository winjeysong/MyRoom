import React from 'react';
import axios from 'axios';
import { Card, Row, Col } from 'antd';
import marked from 'marked';
import highlight from 'highlight.js';
import styles from './ArticlePage.css';

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

class ArticlePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      md: '',
    };
  }

  componentDidMount() {
    this.fetchPost();
  }

  fetchPost() {
    return axios.post(`/api/post/show/${this.props.postId}`, { timeout: 1000 })
    .then((res) => {
      this.setState({
        post: res.data,
        md: marked(res.data.content),
      });
    });
  }

  render() {
    const { post, md } = this.state;
    return (
      <div>
        <Row>
          <Col xs={{ span: 22, offset: 1 }} md={{ span: 20, offset: 2 }}>
            <h1>{post.title}</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={{ span: 22, offset: 1 }} md={{ span: 20, offset: 2 }}>
            <Card bordered={false} className={styles['post-card']}>
              <div className={styles['post-date']}>{post.date}</div>
              <div className={styles['post-content']}>{<div dangerouslySetInnerHTML={{ __html: md }} />}</div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ArticlePage;
