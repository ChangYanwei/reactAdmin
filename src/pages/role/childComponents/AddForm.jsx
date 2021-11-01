import React, { Component } from "react";
import { Form, Input } from "antd";

export default class AddForm extends Component {
  render() {
    return (
      <Form ref={c => (this.form = c)}>
        <Form.Item
          name="roleName"
          label="角色名称"
          rules={[
            {
              required: true,
              message: "请输入角色名称",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    );
  }
}
