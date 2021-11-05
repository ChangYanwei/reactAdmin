import React, { Component } from "react";
import { Table, Card, Button, Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import LinkButton from "../../components/link-button/LinkButton";
import AddAndUpdateForm from "./childComponents/AddAndUpdateForm";

import { formatDate } from "../../utils/dateUtil";

// 引入api
import {
  reqGetUsers,
  reqAddUser,
  reqUpdateUser,
  reqDeleteUser,
} from "../../api/user";
const { confirm } = Modal;

export default class User extends Component {
  constructor() {
    super();
    this.state = {
      users: [], // 用户列表
      roles: [], // 角色列表
      isShowForm: false, // 是否展示添加/修改用户的模态框
      user: {}, // 将要修改的用户
      loading: true, // 表格数据是否加载中
    };
    this.initColumns();
  }

  // 初始化表格列
  initColumns = () => {
    this.columns = [
      {
        title: "用户名",
        dataIndex: "username",
        key: "username",
      },
      {
        title: "邮箱",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "电话",
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: "注册时间",
        dataIndex: "create_time",
        render: formatDate,
      },
      {
        title: "所属角色",
        dataIndex: "role_id",
        render: role_id => this.roleNames[role_id],
      },
      {
        title: "操作",
        render: user => {
          return (
            <span>
              <LinkButton
                onClick={() => this.setState({ isShowForm: true, user })}
              >
                修改
              </LinkButton>
              <LinkButton onClick={() => this.deleteUser(user)}>
                删除
              </LinkButton>
            </span>
          );
        },
      },
    ];
  };

  // 根据角色id获取角色名称
  initRoleNames = roles => {
    const roleNames = roles.reduce((pre, role) => {
      pre[role._id] = role.name;
      return pre;
    }, {});
    this.roleNames = roleNames;
  };

  // 获取用户列表
  getUsers = async () => {
    this.setState({
      loading: true,
    });
    const result = await reqGetUsers();
    if (result.status === 1) {
      return message.error("获取用户列表失败");
    }
    const { users, roles } = result.data;
    this.initRoleNames(roles);
    this.setState({
      roles,
      users,
      loading: false,
    });
  };

  // 添加或者更新用户
  addAndUpdateUser = async () => {
    const form = this.addUpdateForm.form;
    const values = await form.validateFields().catch(() => {
      message.error("请完善信息");
    });
    const { user } = this.state;
    let result;
    if (user._id) {
      // 更新
      result = await reqUpdateUser({
        _id: user._id,
        ...values,
      });
      if (result.status === 0) {
        message.success("更新成功");
        Object.assign(user, values);
        this.closeModal();
      } else {
        message.error("更新失败");
      }
    } else {
      // 添加
      result = await reqAddUser(values);
      if (result.status === 0) {
        message.success("添加成功");
        this.setState(state => ({
          users: [...state.users, result.data],
        }));
        this.closeModal();
      } else {
        message.error("此用户已存在");
      }
    }
  };

  // 删除用户
  deleteUser = user => {
    confirm({
      title: `确定要删除用户${user.username}吗`,
      icon: <ExclamationCircleOutlined />,
      cancelText: "取消",
      okText: "确定",
      onOk: () => {
        console.log("OK");
        reqDeleteUser({ userId: user._id }).then(res => {
          if (res.status === 0) {
            message.success("删除成功");
            this.getUsers();
          } else {
            message.error("删除失败");
          }
        });
      },
    });
  };

  // 关闭模态框
  closeModal = () => {
    this.setState({
      isShowForm: false,
    });
  };

  componentDidMount() {
    this.getUsers();
  }

  render() {
    const { users, roles, isShowForm, user, loading } = this.state;

    const title = (
      <span>
        <Button
          type="primary"
          onClick={() => this.setState({ isShowForm: true, user: {} })}
        >
          添加用户
        </Button>
      </span>
    );

    return (
      <Card title={title}>
        <Table
          bordered
          loading={loading}
          rowKey="_id"
          dataSource={users}
          columns={this.columns}
        />

        <Modal
          title={user._id ? "修改用户" : "添加用户"}
          visible={isShowForm}
          okText="确定"
          cancelText="取消"
          onOk={this.addAndUpdateUser}
          onCancel={this.closeModal}
        >
          <AddAndUpdateForm
            ref={c => (this.addUpdateForm = c)}
            roles={roles}
            user={user}
          />
        </Modal>
      </Card>
    );
  }
}
