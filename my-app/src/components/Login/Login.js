import React from 'react';
import './Login.css';
import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie'
const onFinish = (values) => {
    axios
    .post(
      `http://localhost:4000/users/authenticate`,
      {
        "UserID": "ADMIN001",
        "Password": "1",
        "PostOfficeID": "CNN",
      }
    )
    .then((response) => {
      // If successful
      Cookies.set('authToken', response.data.token, { expires: 1 })
      window.location.href = '/dashboard'
    })
    .catch((error) => {
      // If not successful (duplicate username or other error)
      console.error('Error from server:', error)
    })
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const Login = () => (
  <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Tên đăng nhập"
      name="username"
      rules={[
        {
          required: true,
          message: 'Nhập tên đăng nhập!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Mật khẩu"
      name="password"
      rules={[
        {
          required: true,
          message: 'Nhập mật khẩu!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      label="Bưu cục"
      name="BuucucBuucuc"
      rules={[
        {
          required: true,
          message: 'Nhập bưu cục !',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Nhớ mật khẩu</Checkbox>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Đăng nhập
      </Button>
    </Form.Item>
  </Form>
);
export default Login;