import React from 'react';
import { Row, Col } from 'antd';

function ContentLayout({ title, things }) {
  const grid = {
    xs: {
      span: 22,
      offset: 1,
    },
    sm: {
      span: 20,
      offset: 2,
    },
    md: {
      span: 18,
      offset: 3,
    },
    lg: {
      span: 16,
      offset: 4,
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
