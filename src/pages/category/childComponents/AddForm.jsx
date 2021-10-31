import React, { Component } from "react";
import { Form, Input, Select } from "antd";
import PropTyps from "prop-types";

const { Option } = Select;

// 添加分类的form组件
export default class AddForm extends Component {
  // 添加props校验
  static propTypes = {
    categoryList: PropTyps.array.isRequired,
    parentId: PropTyps.string.isRequired,
  };

  handleChange = value => {
    this.setState({ parentId: value });
  };

  componentDidUpdate() {
    const { parentId } = this.props;

    this.form.setFieldsValue({
      parentId,
    });
  }

  render() {
    const { categoryList, parentId } = this.props;

    return (
      <Form ref={c => (this.form = c)}>
        <Form.Item
          label="所属分类"
          name="parentId"
          initialValue={parentId}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select>
            <Option value="0">一级分类</Option>
            {categoryList.map(c => (
              <Option value={c._id} key={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="分类名称"
          name="categoryName"
          rules={[
            {
              required: true,
              message: "请输入分类名称",
            },
          ]}
        >
          <Input placeholder="请输入分类名称"></Input>
        </Form.Item>
      </Form>
    );
  }
}
