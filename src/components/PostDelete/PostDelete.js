import React from 'react';
import { Form, Button, Message } from 'antd';
import axios from 'axios';

const FormItem = Form.Item;
const token = localStorage.getItem('token');

class PostDelete extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    return axios({
      method: 'post',
      url: `/api/post/delete/${this.props.postId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 1000,
    })
    .then((res) => {
      const { flag, msg } = res.data;
      if (flag) {
        Message.info(msg);
        setTimeout(() => {
          location.href = `/usercenter/${this.props.id}`;
        }, 2000);
      } else {
        Message.error(msg);
        setTimeout(() => {
          location.href = '/login';
        }, 2000);
      }
    });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} style={{ marginTop: '1em' }}>
        <FormItem style={{ textAlign: 'right' }}>
          <Button type="danger" htmlType="submit" loading={this.props.loading} onClick={this.props.click} disabled={this.props.disabled}>
            删除文章
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(PostDelete);
