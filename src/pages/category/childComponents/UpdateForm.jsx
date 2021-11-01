import React, { Component } from "react";
import { Form, Input } from "antd";
import PropTypes from "prop-types";

export default class UpdateForm extends Component {
  static propTypes = {
    categoryName: PropTypes.string.isRequired,
  };

  componentDidUpdate() {
    const { categoryName } = this.props;
    this.form.setFieldsValue({
      categoryName,
    });
  }

  render() {
    const { categoryName } = this.props;
    return (
      <Form ref={c => (this.form = c)}>
        <Form.Item
          name="categoryName"
          initialValue={categoryName}
          rules={[
            {
              required: true,
              message: "请输入分类名称",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    );
  }
}
