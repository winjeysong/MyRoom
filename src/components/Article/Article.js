/**
 * single article card
 */

import React from 'react';
import { Card } from 'antd';
import marked from 'marked';
import highlight from 'highlight.js';
import styles from './Article.css';

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

function Article({ title, date, content }) {
  return (
    <Card title={title} bordered={false} className={styles['post-card']}>
      <div className={styles['post-date']}>{date}</div>
      <div className={styles['post-content']}>{<div dangerouslySetInnerHTML={{ __html: marked(content) }} />}</div>
    </Card>
  );
}

export default Article;
