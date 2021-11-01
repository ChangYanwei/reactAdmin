import React, { Component } from "react";
import { Form, Input, Tree } from "antd";
import PropTypes from "prop-types";
import menuList from "../../../config/menuConfig";

export default class AuthFrom extends Component {
  constructor(props) {
    super(props);
    const { role } = this.props;
    this.state = {
      role: role,
      checkedKeys: role.menus,
    };
  }

  static propTypes = {
    role: PropTypes.object.isRequired,
  };

  // 为父组件提供获取改变后的权限
  getMenu = () => this.state.checkedKeys;

  onCheck = checkedKeys => {
    console.log(checkedKeys);
    this.setState({
      checkedKeys,
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { role } = nextProps;
    this.setState({
      checkedKeys: role.menus,
      role,
    });
  }

  render() {
    const { role, checkedKeys } = this.state;
    return (
      <div>
        <Form.Item label="角色名称">
          <Input value={role.name} disabled />
        </Form.Item>
        <Tree
          checkable
          defaultExpandAll
          checkedKeys={checkedKeys}
          onCheck={this.onCheck}
          treeData={menuList}
        />
      </div>
    );
  }
}
