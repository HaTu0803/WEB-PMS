import React from 'react';
import { Button, Result } from 'antd';
const Error = () => (
  <Result
    status="404"
    title="404"
    subTitle="Trang không tồn tại"
    extra={<Button type="primary">Trở về </Button>}
  />
);
export default Error;