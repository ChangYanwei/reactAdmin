import React, { Component } from "react";
import { Card, Button, Table, Modal, message } from "antd";
import { PAGE_SIZE } from "../../utils/constant";
import { formatDate } from "../../utils/dateUtil";
import memoryUtil from "../../utils/memoryUtil";

// 引入组件
import AddForm from "./childComponents/AddForm";
import AuthFrom from "./childComponents/AuthFrom";

// 引入api
import { reqGetRoles, reqAddRole, reqUpdateRole } from "../../api/role";

export default class Role extends Component {
  constructor() {
    super();
    this.initColumns();
    this.state = {
      roles: [], // 角色列表
      showStatus: 0, // 是否显示模态框，0：都不显示，1：显示添加框，2：显示更新框
      role: {}, // 当前选中的角色
      loading: true, // 表格数据是否加载中
    };
  }

  // 初始化表格列
  initColumns = () => {
    this.columns = [
      {
        title: "角色名称",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "创建时间",
        dataIndex: "create_time",
        render: formatDate,
      },
      {
        title: "授权时间",
        dataIndex: "auth_time",
        render: formatDate,
      },
      {
        title: "授权人",
        dataIndex: "auth_name",
        key: "auth_name",
      },
    ];
  };

  // 表格行的变化
  onRow = role => {
    return {
      onClick: () => {
        this.setState({
          role,
        });
      },
    };
  };

  // 选中单选按钮
  onRadioSelect = role => {
    this.setState({
      role,
    });
  };

  // 获取角色列表
  getRoles = async () => {
    this.setState({
      loading: true,
    });
    const result = await reqGetRoles();
    if (result.status !== 0) {
      return message.error("获取角色列表失败，请重试");
    }
    this.setState({
      roles: result.data,
      loading: false,
    });
  };

  // 展示添加角色的模态框
  showAddModal = () => {
    this.setState({
      showStatus: 1,
    });
  };

  // 发送请求添加角色
  addRole = async () => {
    const form = this.addForm.form;
    const values = await form.validateFields().catch(() => {
      message.error("请输入角色名称");
    });
    if (!values) return;
    const roleName = values.roleName;
    const result = await reqAddRole({
      roleName,
    });
    if (result.status === 0) {
      message.success("添加成功");
      this.closeModal();
      // 重置表单
      form.resetFields();
      // 不发送请求，更新数据
      this.setState(state => {
        return {
          roles: [...state.roles, result.data],
        };
      });
    } else {
      message.error("添加失败，请重试");
    }
  };

  // 展示设置角色权限的模态框
  showSetRoleModal = () => {
    this.setState({
      showStatus: 2,
    });
  };

  // 关闭模态框
  closeModal = () => {
    this.setState({
      showStatus: 0,
    });
    // 清除表单数据
    this.addForm && this.addForm.form.resetFields();
  };

  // 更新角色权限
  updateRole = async () => {
    const { role } = this.state;
    const checkedKeys = this.setForm.getMenu();
    const auth_name = memoryUtil.user.username;
    const auth_time = Date.now();

    // 这样设置能够少发一次请求
    role.menus = checkedKeys;
    role.auth_name = auth_name;
    role.auth_time = auth_time;

    const result = await reqUpdateRole({
      _id: role._id,
      menus: checkedKeys,
      auth_time,
      auth_name,
    });
    console.log(result);
    if (result.status === 0) {
      message.success("设置成功");
      this.closeModal();
    }
  };

  componentDidMount() {
    this.getRoles();
  }

  render() {
    const { roles, showStatus, role, loading } = this.state;

    const title = (
      <span>
        <Button
          type="primary"
          style={{ marginRight: "10px" }}
          onClick={this.showAddModal}
        >
          创建角色
        </Button>
        <Button
          type="primary"
          disabled={!role._id}
          onClick={this.showSetRoleModal}
        >
          设置角色权限
        </Button>
      </span>
    );
    return (
      <Card title={title}>
        <Table
          bordered
          loading={loading}
          rowKey="_id"
          dataSource={roles}
          columns={this.columns}
          pagination={{
            defaultPageSize: PAGE_SIZE,
          }}
          rowSelection={{
            type: "radio",
            selectedRowKeys: [role._id],
            onSelect: this.onRadioSelect,
          }}
          onRow={this.onRow}
        />

        <Modal
          title="添加分类"
          visible={showStatus === 1}
          okText="确定"
          cancelText="取消"
          onOk={this.addRole}
          onCancel={this.closeModal}
        >
          <AddForm ref={c => (this.addForm = c)} />
        </Modal>

        <Modal
          title="设置角色权限"
          visible={showStatus === 2}
          okText="确定"
          cancelText="取消"
          onOk={this.updateRole}
          onCancel={this.closeModal}
        >
          <AuthFrom role={role} ref={c => (this.setForm = c)} />
        </Modal>
      </Card>
    );
  }
}
