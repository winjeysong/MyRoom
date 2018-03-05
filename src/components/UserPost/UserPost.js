import React from 'react';
import { Form, Input, Icon, Card, Button, Message } from 'antd';
import fetch from 'dva/fetch';
import styles from './UserPost.css';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

class UserPost extends React.Component {
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
      fetch('/api/post/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          postInfo: values,
          author: localStorage.getItem('id'),
        }),
      }).then((res) => {
        res.json().then((ress) => {
          Message.info(ress.msg);
          if (ress.flag) {
            setTimeout(() => {
              location.href = `/usercenter/${localStorage.getItem('id')}`;
            }, 1000);
          }
        });
      });
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.normal}>
        <Card style={{ width: '75%', margin: '20px auto' }}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('title', {
                rules: [{ required: true, message: '请输入文章标题!' }],
              })(
                <Input prefix={<Icon type="edit" style={{ fontSize: 13 }} />} placeholder="标题" />,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('content', {
                rules: [{ required: true, message: '请输入文章内容!' }],
              })(
                <TextArea placeholder="开始记录吧..." autosize={{ minRows: 18 }} />,
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create()(UserPost);
