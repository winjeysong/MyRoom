import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Message } from 'antd';
import fetch from 'dva/fetch';
import { Link } from 'dva/router';
import styles from './Login.css';

const FormItem = Form.Item;

class Login extends React.Component {
  getValues() {
    const self = this;
    return new Promise((resolve, reject) => {
      self.props.form.validateFields((err, values) => {
        if (!err) {
          resolve(values);
        } else {
          reject(console.error(err));
        }
      });
    });
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    const values = await this.getValues();
    if (values) {
      console.log(values);
      fetch('/api/user/user-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(values),
      }).then((res) => {
        res.json().then((ress) => {
          Message.info(ress.msg);
          if (ress.flag) {
            location.href = '/';
          }
        });
      });
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles['login-wrapper']}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入您的用户名!' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入您的密码！' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住密码</Checkbox>,
            )}
            <span className={styles['regist-wrapper']}>没有账号？<Link to="/register">点击注册!</Link></span>
            <Button type="primary" htmlType="submit" className={styles['login-btn']}>
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedLogin = Form.create()(Login);

export default WrappedLogin;
