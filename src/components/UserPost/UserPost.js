import React from 'react';
import marked from 'marked';
import highlight from 'highlight.js';
import { Form, Input, Icon, Card, Button, Message, Row, Col } from 'antd';
import fetch from 'dva/fetch';
import styles from './UserPost.less';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

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
  breaks: true,
});

class UserPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      preview: '',
      loading: false,
    };
    this.onContentInput = this.onContentInput.bind(this);
  }

  componentDidMount() {
    highlight.initHighlighting();
  }

  onContentInput(e) {
    this.setState({
      preview: marked(e.target.value),
    });
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

  handleSubmit = async (e) => {
    e.preventDefault();
    const values = await this.getValues();
    const token = localStorage.getItem('token');
    if (values) {
      fetch('/api/post/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${token}`,
        },
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
      <div className={styles.normal}>
        <Row>
          <Col xs={24} md={{ span: 12, offset: 1 }}>
            <h2>愉快地支持Markdown语法，及代码高亮。</h2>
          </Col>
        </Row>
        <Row gutter={32}>
          <Col xs={24} md={{ span: 12, offset: 1 }}>
            <Card bordered={false} className={styles.card}>
              <Form onSubmit={this.handleSubmit}>
                <FormItem>
                  {getFieldDecorator('title', {
                    rules: [{ required: true, message: '请输入文章标题!' }],
                  })(
                    <Input prefix={<Icon type="edit" style={{ fontSize: 14 }} />} placeholder="标题" />,
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('content', {
                    rules: [{ required: true, message: '请输入文章内容!' }],
                  })(
                    <TextArea placeholder="开始记录吧..." autosize={{ minRows: 18 }} onInput={this.onContentInput} />,
                  )}
                </FormItem>
                <FormItem style={{ textAlign: 'right' }}>
                  <Button type="primary" htmlType="submit" loading={this.state.loading} onClick={this.handleLoading}>
                    保存
                  </Button>
                </FormItem>
              </Form>
            </Card>
          </Col>
          <Col xs={24} md={10}>
            <Card bordered={false} className={styles.card} title="实时预览">
              <div dangerouslySetInnerHTML={{ __html: this.state.preview || '在文本框内输入，在这里预览结果...' }} />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(UserPost);
