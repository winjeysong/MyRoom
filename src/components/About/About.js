import React from 'react';
import { Card } from 'antd';
import marked from 'marked';
import styles from './About.css';
import ContentLayout from '../Layout/ContentLayout';

function About() {
  const md = '## 概述\n本站是从前端到后端的一个SPA demo，贯彻了前后端分离的思想。\n## 资源\n本站除了基本的HTML、CSS、JavaScript及Node之外，主要用到了：\n* 主框架：React\n* UI组件：AntD\n* 数据流处理：Dva\n* 服务端框架：Koa\n* 数据库驱动：Mongoose\n## 版本\n* Node: v8.9.0\n* MongoDB: v3.4.9\n## 主要功能特性\n### 1.响应式\n主要通过**栅格**和**媒体查询**来适配多终端（PC/移动端），适应不同屏幕大小。\n### 2.实现功能\n* 用户注册及登陆\n* 使用*JWT(JSON Web Token)*进行用户登陆验证\n* 用户资料修改\n* 用户对文章的CURD操作\n### 3.不兼容IE8及以下\n## 还有其他内容或功能待更新...';
  const card = (
    <Card className={styles.card}>
      <div className={styles.content}>
        <div dangerouslySetInnerHTML={{ __html: marked(md) }} />
      </div>
    </Card>
  );
  return (
    <ContentLayout title={<h1>关于本站</h1>} things={card} />
  );
}

export default About;
