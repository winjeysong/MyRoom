import React from 'react';
import { Icon } from 'antd';
import styles from './FooterMsg.css';

function FooterMsg() {
  return (
    <div className={styles.normal}>
      <div className={styles['footer-wrapper']}>
        Developed with <br />
        <a href="http://2x.ant.design/index-cn" className={styles['footer-link']}><Icon className={styles['footer-icon']} type="heart" /> AntD</a><br />
        <a href="https://github.com/dvajs/dva" className={styles['footer-link']}><Icon className={styles['footer-icon']} type="heart" /> Dva</a><br />
        <a href="http://koajs.com/" className={styles['footer-link']}><Icon className={styles['footer-icon']} type="heart" /> Koa2</a><br />
        <a href="http://mongoosejs.com/" className={styles['footer-link']}><Icon className={styles['footer-icon']} type="heart" /> Mongoose</a>
        <br />@winjeysong
      </div>
    </div>
  );
}

export default FooterMsg;
