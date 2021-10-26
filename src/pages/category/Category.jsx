import React, { Component } from "react";
import { Card, Button, Table, message, Modal } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import LinkButton from "../../components/link-button/LinkButton";

// 子组件
import AddForm from "./components/AddForm";
import UpdateForm from "./components/UpdateForm";

// 获取发送网络请求的函数
import {
  reqGetCategoryList,
  reqAddCategory,
  reqUpdateCategoryName,
} from "../../api/category";

export default class Category extends Component {
  constructor() {
    super();
    this.initTableColumns();
  }

  state = {
    loading: false,
    categoryList: [], // 一级分类列表
    subCategoryList: [], // 二级分类列表
    parentId: "0", // 父级分类的id
    parentName: "", // 父级分类的名称
    showStatus: 0, // 是否显示模态框，0：都不显示，1：显示添加框，2：显示更新框
    changeName: "", // 要修改的分类名称
  };

  // 初始化table表格中列的数组
  initTableColumns = () => {
    const { parentId } = this.state;
    this.columns = [
      {
        title: "分类的名称",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "操作",
        width: 300,
        render: category => {
          return (
            <span>
              <LinkButton onClick={() => this.showUpdateModal(category)}>
                修改分类
              </LinkButton>
              {parentId === "0" ? (
                <LinkButton onClick={() => this.showSubCategorys(category)}>
                  查看子分类
                </LinkButton>
              ) : (
                ""
              )}
            </span>
          );
        },
      },
    ];
  };

  // 获取一级或二级分类列表
  getCategorys = () => {
    // 发请求前显示loading
    this.setState({
      loading: true,
    });

    const { parentId } = this.state;

    reqGetCategoryList({
      parentId,
    })
      .then(res => {
        console.log(res.data);
        if (res.status === 0) {
          if (parentId === "0") {
            // 更新一级分类列表
            this.setState({
              categoryList: res.data,
            });
          } else {
            // 更新二级分类列表
            this.setState({
              subCategoryList: res.data,
            });
          }
        } else {
          message.error("获取分类列表失败");
        }
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };

  // 展示二级分类（从一级分类跳转到二级分类）
  showSubCategorys = category => {
    this.setState(
      {
        parentId: category._id,
        parentName: category.name,
      },
      () => {
        console.log("点击", this.state.parentId);
        this.getCategorys();
        this.initTableColumns();
      }
    );
  };

  // 展示一级分类（从二级分类跳转到一级分类）
  showFistCategory = () => {
    this.setState(
      {
        parentId: "0",
      },
      () => {
        this.getCategorys();
        this.initTableColumns();
      }
    );
  };

  // 展示添加分类的模态框
  showAddModal = name => {
    this.setState({
      showStatus: 1,
      changeName: name,
    });
  };

  // 添加分类
  addCategory = async () => {
    const form = this.addForm.form;

    const values = await form.validateFields().catch(() => {
      message.error("请输入分类名称");
    });
    if (!values) return;
    const { parentId } = this.state;
    const res = await reqAddCategory(values).catch(() => {
      message.error("添加失败");
    });
    if (res.status === 0) {
      message.success("添加成功");
      // 只要当前显示列表的id和选择添加的父级分类的id相同时才需要发请求获取新的数据
      if (parentId === values.parentId) {
        this.getCategorys();
      }
      this.setState({
        showStatus: 0,
      });
      form.resetFields();
    } else {
      message.error("添加失败");
    }
  };

  // 展示更新分类的模态框
  showUpdateModal = category => {
    console.log(category);
    this.setState({
      showStatus: 2,
      changeCategory: category,
    });
  };

  // 更新分类
  updateCategory = async () => {
    const form = this.updateForm.form;
    const values = await form.validateFields().catch(() => {
      message.error("请输入分类名称");
    });
    if (!values) return;
    const { changeCategory } = this.state;
    const res = await reqUpdateCategoryName({
      categoryId: changeCategory._id,
      categoryName: values.categoryName,
    }).catch(() => {
      message.error("更新失败，请重试");
    });
    if (res.status === 0) {
      message.success("更新成功");
      this.closeModal();
      this.getCategorys();
      // form.resetFields();
    } else {
      message.error("更新失败，请重试");
    }
  };

  // 关闭模态框
  closeModal = () => {
    this.setState({
      showStatus: 0,
    });
  };

  componentDidMount() {
    this.getCategorys();
  }

  render() {
    const {
      categoryList,
      subCategoryList,
      loading,
      showStatus,
      parentId,
      parentName,
    } = this.state;
    const changeCategory = this.state.changeCategory || {};

    const title =
      parentId === "0" ? (
        "一级分类列表"
      ) : (
        <span>
          <LinkButton onClick={this.showFistCategory}>一级分类列表</LinkButton>
          <CaretRightOutlined />
          <span>{parentName}</span>
        </span>
      );

    const extra = (
      <Button type="primary" onClick={this.showAddModal}>
        添加
      </Button>
    );

    return (
      <div>
        <Card title={title} extra={extra}>
          <Table
            bordered
            loading={loading}
            rowKey="_id"
            dataSource={parentId === "0" ? categoryList : subCategoryList}
            columns={this.columns}
          />
        </Card>

        <Modal
          title="添加分类"
          visible={showStatus === 1}
          okText="确定"
          cancelText="取消"
          onOk={this.addCategory}
          onCancel={this.closeModal}
        >
          <AddForm
            categoryList={categoryList}
            parentId={parentId}
            ref={c => (this.addForm = c)}
          />
        </Modal>

        <Modal
          title="更新分类"
          visible={showStatus === 2}
          okText="确定"
          cancelText="取消"
          onOk={this.updateCategory}
          onCancel={this.closeModal}
        >
          <UpdateForm
            categoryName={changeCategory.name}
            ref={c => (this.updateForm = c)}
          />
        </Modal>
      </div>
    );
  }
}
