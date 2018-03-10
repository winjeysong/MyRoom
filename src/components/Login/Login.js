import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Message } from 'antd';
import fetch from 'dva/fetch';
import styles from './Login.css';
import { resultMsg as MSG } from '../../../controller/const';

const FormItem = Form.Item;

class Login extends React.Component {
  state = {
    loading: false,
  };

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
      fetch('/api/user/user-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(values),
      }).then((res) => {
        res.json().then((ress) => {
          switch (ress.msg) {
            case MSG.LOGIN_SUCCESS:
              localStorage.setItem('id', ress.id); // store user id locally, use it to switch the menu item.
              localStorage.setItem('token', ress.token); // store token locally
              Message.success(ress.msg);
              setTimeout(() => {
                location.href = `/usercenter/${ress.id}`;
              }, 1000);
              break;
            case MSG.LOGIN_USER_NOT_EXISTENCE:
              Message.warning(ress.msg);
              setTimeout(() => {
                location.href = '/register';
              }, 2000);
              break;
            case MSG.LOGIN_PASSWD_ERR:
              Message.error(ress.msg);
              setTimeout(() => {
                this.setState({ loading: false });
              }, 2000);
              break;
          }
        });
      });
    }
  }

  handleLoading = () => {
    this.props.form.validateFields((err) => {
      if (!err) {
        this.setState({ loading: true });
      }
    });
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
            <Button type="primary" htmlType="submit" loading={this.state.loading} onClick={this.handleLoading} className={styles['login-btn']}>
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
