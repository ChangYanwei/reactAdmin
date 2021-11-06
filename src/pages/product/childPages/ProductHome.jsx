import React, { Component } from "react";
import { Card, Select, Input, Button, Table, message } from "antd";

import LinkButton from "../../../components/link-button/LinkButton";

import {
  reqGetProducts,
  reqSearchProduct,
  reqChangeStatus,
} from "../../../api/product";
import { PAGE_SIZE } from "../../../utils/constant";
const { Option } = Select;

// product的默认路由组件
export default class ProductHome extends Component {
  constructor() {
    super();
    this.initColumns();
  }

  state = {
    products: [], // 商品数组
    total: 0, // 商品总数
    loading: false,
    searchName: "", // 搜索的关键字
    searchType: "productName", // 搜索类型
    pageNum: 1, // 当前页码
  };

  // 初始化表格的渲染列
  initColumns = () => {
    this.columns = [
      {
        title: "商品名称",
        dataIndex: "name",
      },
      {
        title: "商品描述",
        dataIndex: "desc",
      },
      {
        title: "价格",
        dataIndex: "price",
        render: price => "￥" + price,
      },
      {
        title: "状态",
        render: product => {
          const { status, _id: productId } = product;
          const toStatus = status === 1 ? 2 : 1;
          return (
            <div>
              <Button
                type="primary"
                danger={status !== 1}
                onClick={() => this.changeProductStatus(toStatus, productId)}
              >
                {status === 1 ? "下架" : "上架"}
              </Button>
              <p>{status === 1 ? "在售" : "停售"}</p>
            </div>
          );
        },
      },
      {
        title: "操作",
        render: product => {
          return (
            <div>
              <LinkButton
                onClick={() => {
                  this.props.history.push("/product/detail", product);
                }}
              >
                详情
              </LinkButton>
              <LinkButton
                onClick={() => {
                  this.props.history.push("/product/addupdate", product);
                }}
              >
                修改
              </LinkButton>
            </div>
          );
        },
      },
    ];
  };

  // 跳转到添加商品界面
  gotoAddUpdate = () => {
    this.props.history.push("/product/addupdate");
  };

  // 获取商品列表
  getProducts = async (pageNum = 1) => {
    this.setState({
      loading: true,
    });
    let result;
    const { searchName, searchType } = this.state;
    if (searchName.trim()) {
      result = await reqSearchProduct({
        pageNum,
        pageSize: PAGE_SIZE,
        [searchType]: searchName,
      });
    } else {
      result = await reqGetProducts({
        pageNum,
        pageSize: PAGE_SIZE,
      });
    }

    if (result.status === 0) {
      const { list, total } = result.data;
      if (list.length === 0) {
        message.warning("暂无商品");
      }
      this.setState({
        products: list,
        total,
      });
    } else {
      message.error("商品列表获取失败，请重试");
    }
    this.setState({
      loading: false,
    });
  };

  // 监听页码改变的函数
  pageChange = pageNum => {
    this.getProducts(pageNum);
    this.pageNum = pageNum;
  };

  // 搜索关键字
  onSearchNameChange = e => {
    this.setState({
      searchName: e.target.value,
    });
  };

  // 搜索类型下拉框
  onSelectChange = value => {
    this.setState({
      searchType: value,
    });
  };

  // 搜索
  search = async () => {
    const { searchName, searchType } = this.state;
    const result = await reqSearchProduct({
      pageNum: 1,
      pageSize: 5,
      [searchType]: searchName,
    });
    if (result.status !== 0) return message.error("查询失败，请重试");
    const { list, total } = result.data;
    if (list.length === 0) message.warning("暂无商品");
    this.setState({
      products: list,
      total,
    });
  };

  // 改变商品状态
  changeProductStatus = async (status, productId) => {
    const result = await reqChangeStatus({
      status,
      productId,
    });
    if (result.status === 0) {
      message.success("更新成功");
      this.getProducts(this.pageNum);
    } else {
      message.error("更新失败，请重试");
    }
  };

  componentDidMount() {
    this.getProducts(1);
  }

  render() {
    const { products, loading, total, searchName, searchType } = this.state;

    const title = (
      <div>
        <Select
          value={searchType}
          style={{ width: 150 }}
          onChange={this.onSelectChange}
        >
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>

        <Input
          placeholder="关键字"
          style={{ width: 150, margin: "0 15px" }}
          value={searchName}
          onChange={this.onSearchNameChange}
        />

        <Button type="primary" onClick={() => this.getProducts(1)}>
          搜索
        </Button>
      </div>
    );

    const extra = (
      <Button type="primary" onClick={this.gotoAddUpdate}>
        添加商品
      </Button>
    );

    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          loading={loading}
          rowKey="_id"
          dataSource={products}
          columns={this.columns}
          pagination={{
            defaultPageSize: PAGE_SIZE,
            total,
            onChange: this.pageChange,
          }}
        />
      </Card>
    );
  }
}
