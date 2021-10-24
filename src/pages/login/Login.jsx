import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./Login.less";
import logo from "../../assets/images/logo.png";
import storageUtil from "../../utils/storageUtil";
import memoryUtil from "../../utils/memoryUtil";

import { reqLogin } from "../../api/login";

export default class Login extends Component {
  handleSubmit = values => {
    reqLogin(values).then(res => {
      console.log(res);
      if (res.status === 0) {
        message.success("登录成功");
        // 保存用户到localStorage中
        storageUtil.saveUser(res.data);
        memoryUtil.user = res.data;

        this.props.history.replace("/");
      } else {
        message.error("用户名或密码错误");
      }
    });
  };

  render() {
    const user = memoryUtil.user || {};
    if (user._id) {
      return <Redirect to="/" />;
    }
    return (
      <div className="login">
        <div className="login-header">
          <img className="logo" src={logo} alt="logo" />
          <p>react后台管理系统</p>
        </div>
        <div className="login-content">
          <p>用户登陆</p>
          <Form className="login-form" onFinish={this.handleSubmit}>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "请输入用户名",
                },
                {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message: "用户名必须是英文数字或者下划线",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
                placeholder="用户名"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "请输入密码",
                },
                {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message: "密码必须是英文数字或者下划线",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登陆
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
