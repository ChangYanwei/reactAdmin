import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./Login.less";
import logo from "../../assets/images/logo.png";
import { login } from "../../redux/actions/user";

class Login extends Component {
  handleSubmit = values => {
    this.props.login(values);
  };

  render() {
    const user = this.props.user;
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

export default connect(
  state => ({
    user: state.user,
  }),
  { login }
)(Login);
