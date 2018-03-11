import React from 'react';
import { Form, Input, Cascader, Select, Button, AutoComplete, Message, Card } from 'antd';
import fetch from 'dva/fetch';
import styles from './InfoModify.css';
import ContentLayout from '../Layout/ContentLayout';

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

const token = localStorage.getItem('token');

class InfoModify extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    loading: false,
  };

  componentDidMount() {
    this.fetchInfo();
  }

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

  fetchInfo() {
    const self = this;
    const setFieldsValue = self.props.form.setFieldsValue;
    fetch(`/api/user/id/${this.props.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      res.json().then((ress) => {
        if (ress.username) {
          const { username, email, residence, cellphone, website } = ress;
          setFieldsValue({
            username,
            email,
            residence,
            cellphone,
            website,
          });
        } else if (ress.msg) {
          Message.error(ress.msg);
          setTimeout(() => {
            location.href = '/login';
          }, 2000);
        }
      });
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const values = await this.getValues();
    if (values) {
      fetch(`/api/user/update/${this.props.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      }).then((res) => {
        res.json().then((ress) => {
          if (ress.flag) {
            Message.success(ress.msg);
            setTimeout(() => {
              location.href = '/login';
            }, 2000);
          } else {
            Message.error(ress.msg);
            setTimeout(() => {
              this.setState({ loading: false });
            }, 2000);
          }
        });
      });
    }
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

  handleLoading = () => {
    this.props.form.validateFields((err) => {
      if (!err) {
        this.setState({ loading: true });
      }
    });
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

    const title = <h2>个人资料修改</h2>;
    const content = (
      <div className={styles['info-modify']}>
        <Card bordered={false} className={styles.card}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label="用户名"
            >
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入您的用户名!', whitespace: true }],
              })(
                <Input disabled />,
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
              label="原密码"
              hasFeedback
            >
              {getFieldDecorator('oldpassword', {
                rules: [{
                  required: true, message: '请输入您的原密码!',
                }],
              })(
                <Input type="password" placeholder="输入原密码" />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="新密码"
              hasFeedback
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: '请输入您的新密码!',
                }],
              })(
                <Input type="password" placeholder="输入新密码" />,
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
              <Button type="primary" htmlType="submit" loading={this.state.loading} onClick={this.handleLoading} style={{ width: '100%' }}>保存</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );

    return (
      <ContentLayout title={title} things={content} />
    );
  }
}

export default Form.create()(InfoModify);
