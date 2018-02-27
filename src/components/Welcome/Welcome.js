import React from 'react';
import { Button } from 'antd';
import { Link } from 'dva/router';
import FooterMsg from '../../components/FooterMsg/FooterMsg';
import styles from './Welcome.css';

function Welcome() {
  return (
    <div className={styles.normal}>
      <div className={styles.background}>
        <div className={styles['blank-wrapper']}>
          <div className={styles.title}>Welcome to My Room</div>
          This is a demo created by winjeysong.
          <div className={styles['link-wrapper']}>
            <ul className={styles.list}>
              <li><Link to="/login"><Button className={styles['button-primary']}>立即登录</Button></Link></li>
              <li>没有账号？<Link to="/register">点击注册!</Link></li>
            </ul>
          </div>
          <div className={styles.footer}>
            <FooterMsg />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
