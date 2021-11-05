import React, { Component } from "react";
import { Form, Input, Select } from "antd";
import PropTypes from "prop-types";
const { Option } = Select;

export default class AddAndUpdateForm extends Component {
  static propTypes = {
    roles: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
  };

  componentDidUpdate() {
    const {
      username = "",
      phone = "",
      email = "",
      role_id = "",
    } = this.props.user;

    this.form.setFieldsValue({
      username,
      phone,
      email,
      role_id,
      password: "",
    });
  }

  render() {
    const { roles, user } = this.props;
    return (
      <Form
        labelCol={{ span: 4, offset: 1 }}
        ref={c => (this.form = c)}
        initialValues={user}
      >
        {/* 用户名 */}
        <Form.Item
          name="username"
          label="用户名"
          rules={[
            {
              required: true,
              message: "请输入用户名",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* 密码 */}
        {!user._id ? (
          <Form.Item
            name="password"
            label="密码"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        ) : (
          ""
        )}

        {/* 手机号 */}
        <Form.Item name="phone" label="手机号">
          <Input />
        </Form.Item>

        {/* 邮箱 */}
        <Form.Item
          name="email"
          label="邮箱"
          rules={[
            {
              type: "email",
              message: "请输入正确的邮箱格式",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* 角色名称 */}
        <Form.Item
          name="role_id"
          label="角色"
          rules={[
            {
              required: true,
              message: "请选择角色",
            },
          ]}
        >
          <Select style={{ width: 120 }}>
            {roles.map(role => (
              <Option key={role._id} value={role._id}>
                {role.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    );
  }
}
