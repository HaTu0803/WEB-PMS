import React, { useState, useEffect } from 'react';
import './Login.css';
import { Button, Checkbox, Form, Input, message } from 'antd'; // Import the message component from Ant Design
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = () => {
  const onFinish = (values) => {
    axios
      .post(
        `http://localhost:4000/users/authenticate`,
        {
          UserID: values.UserID,
          Password: values.Password,
          PostOfficeID: values.PostOfficeID,
        }
      )
      .then((response) => {
        // sau nay co sua gi khi dang nhap loi thi tinh h chi tinh login dung
        Cookies.set('authToken', response.data.token, { expires: 1 })
        window.location.href = '/dashboard'

          //   message.error('Tên đăng nhập, mật khẩu hoặc bưu cục không đúng.');
      })
      .catch((error) => {
        // If not successful (duplicate username or other error)
        console.error('Error from server:', error)
      })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
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
        name="UserID"
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
        name="Password"
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
        name="PostOfficeID"
        rules={[
          {
            required: true,
            message: 'Nhập bưu cục!',
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
};

export default Login;
