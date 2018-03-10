import React from 'react';
import { Row, Col } from 'antd';

function ContentLayout({ title, things }) {
  const grid = {
    xs: {
      span: 22,
      offset: 1,
    },
    md: {
      span: 20,
      offset: 2,
    },
  };

  return (
    <div>
      <Row>
        <Col {...grid}>
          {title}
        </Col>
      </Row>
      <Row>
        <Col {...grid}>
          {things}
        </Col>
      </Row>
    </div>
  );
}

export default ContentLayout;
