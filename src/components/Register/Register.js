import React from 'react';
import { Form, Input, Cascader, Select, Button, AutoComplete, Message } from 'antd';
import fetch from 'dva/fetch';
import styles from './Register.css';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const residences = [{
  value: '浙江',
  label: '浙江',
  children: [{
    value: '杭州',
    label: '杭州',
    children: [{
      value: '西湖区',
      label: '西湖区',
    }],
  }],
}, {
  value: '江苏',
  label: '江苏',
  children: [{
    value: '南京',
    label: '南京',
    children: [{
      value: '玄武区',
      label: '玄武区',
    }],
  }],
}];

class Register extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  getValues() {
    const self = this;
    return new Promise((resolve, reject) => {
      self.props.form.validateFieldsAndScroll((err, values) => {
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
      fetch('/api/user/user-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(values),
      }).then((res) => {
        res.json().then((ress) => {
          Message.info(ress.msg);
          if (ress.flag) {
            setTimeout(() => {
              location.href = '/login';
            }, 1000);
          }
        });
      });
    }
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('您两次输入的密码不相同，请重新确认!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 60 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <div className={styles['register-wrapper']}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="用户名"
            hasFeedback
          >
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入您的用户名!', whitespace: true }],
            })(
              <Input />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="邮箱"
            hasFeedback
          >
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: '邮箱地址填写错误!',
              }, {
                required: true, message: '请输入您的邮箱!',
              }],
            })(
              <Input />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="密码"
            hasFeedback
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: '请输入您的密码!',
              }, {
                validator: this.checkConfirm,
              }],
            })(
              <Input type="password" />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="确认密码"
            hasFeedback
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: '请再次输入您的密码!',
              }, {
                validator: this.checkPassword,
              }],
            })(
              <Input type="password" onBlur={this.handleConfirmBlur} />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="所在地"
          >
            {getFieldDecorator('residence', {
              initialValue: ['浙江', '杭州', '西湖区'],
              rules: [{ type: 'array', required: true, message: '请选择您的所在地!' }],
            })(
              <Cascader options={residences} placeholder="" />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="手机号码"
          >
            {getFieldDecorator('cellphone', {
              rules: [{ required: true, message: '请输入您的手机号码!' }],
            })(
              <Input addonBefore={prefixSelector} style={{ width: '100%' }} />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="个人主页"
          >
            {getFieldDecorator('website')(
              <AutoComplete
                dataSource={websiteOptions}
                onChange={this.handleWebsiteChange}
              >
                <Input />
              </AutoComplete>,
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>注册</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedRegister = Form.create()(Register);

export default WrappedRegister;
