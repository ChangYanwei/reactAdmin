import React, { Component } from "react";

import { Card, Form, Input, Button, Cascader, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import LinkButton from "../../../components/link-button/LinkButton";
import ProductPicturesWall from "../childComponents/ProductPicturesWall";
import RichTextEdit from "../childComponents/RichTextEdit";

// 发送网络请求
import { reqGetCategoryList } from "../../../api/category";
import { reqAddProduct, reqUpdateProduct } from "../../../api/product";

const { TextArea } = Input;

// product的添加和更新的子路由组件
export default class ProductAddUpdate extends Component {
  constructor(props) {
    super(props);
    const product = this.props.location.state;
    const isUpdate = !!product;
    this.state = {
      options: [],
      subOptions: [],
      categoryIds: [],
      isUpdate,
      product: product || {},
    };
  }

  // 返回上一个页面
  gotoProduct = () => {
    this.props.history.goBack();
  };

  // 初始化options列表
  initOptions = async categorys => {
    const options = categorys.map(item => {
      return {
        value: item._id,
        label: item.name,
        isLeaf: false,
      };
    });

    const { isUpdate, product } = this.state;
    const { pCategoryId } = product;
    if (isUpdate) {
      let subCategorys = await this.getCategorys(pCategoryId);
      subCategorys = subCategorys.map(item => {
        return {
          value: item._id,
          label: item.name,
          isLeaf: true,
        };
      });
      const targetOption = options.find(item => item.value === pCategoryId);
      targetOption.children = subCategorys;
    }

    this.setState({
      options,
    });
  };

  // 获取一级或二级分类列表
  getCategorys = async parentId => {
    const res = await reqGetCategoryList({
      parentId,
    });

    if (res.status !== 0) {
      message.error("获取分类列表失败");
      return;
    }
    if (parentId === "0") {
      // 更新一级分类列表
      this.initOptions(res.data);
      return res.data;
    } else {
      // 更新二级分类列表
      return res.data;
    }
  };

  // 用于加载下一级列表的回调函数
  loadData = async selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    // 获取二级分类
    const options = await this.getCategorys(targetOption.value);
    if (options && options.length > 0) {
      const childOptions = options.map(item => {
        return {
          value: item._id,
          label: item.name,
          isLeaf: true,
        };
      });
      targetOption.children = childOptions;
    } else {
      targetOption.isLeaf = true;
    }

    setTimeout(() => {
      targetOption.loading = false;
      this.setState({
        options: [...this.state.options],
      });
    }, 200);
  };

  // 级联选择框
  onCascaderChange = categoryIds => {
    console.log(categoryIds);
    this.setState({
      categoryIds,
    });
  };

  // 表单提交
  onFinish = async values => {
    let pCategoryId, categoryId;
    const { isUpdate, product, categoryIds } = this.state;
    if (isUpdate) {
      pCategoryId = product.pCategoryId;
      categoryId = product.categoryId;
    } else {
      pCategoryId = categoryIds[0];
      categoryId = categoryIds[1];
    }
    if (!pCategoryId) {
      return message.error("请选择商品分类");
    }

    const imgs = this.picturesWall.getImgs();
    const detail = this.richTextEditor.getDetail();
    // 收集数据
    const data = {
      ...values,
      detail,
      categoryId,
      pCategoryId,
      imgs,
    };
    console.log(data);

    // 发送请求
    let result;
    if (isUpdate) {
      data._id = product._id;
      result = await reqUpdateProduct(data);
    } else {
      result = await reqAddProduct(data);
    }

    if (result.status === 0) {
      message.success("操作成功");
      this.gotoProduct();
    } else {
      message.error("操作失败");
    }
  };

  componentDidMount() {
    this.getCategorys("0");
  }

  render() {
    const { isUpdate, product = {} } = this.state;
    const {
      name,
      desc,
      price,
      categoryId,
      pCategoryId,
      imgs = [],
      detail = "",
    } = product;
    const title = (
      <span>
        <LinkButton onClick={this.gotoProduct}>
          <ArrowLeftOutlined />
        </LinkButton>
        <span>{isUpdate ? "修改商品" : "添加商品"}</span>
      </span>
    );
    return (
      <Card title={title}>
        <Form
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 10 }}
          onFinish={this.onFinish}
        >
          {/* 商品名称 */}
          <Form.Item
            label="商品名称"
            name="name"
            initialValue={name}
            rules={[{ required: true, message: "请输入商品名称" }]}
          >
            <Input />
          </Form.Item>

          {/* 商品描述 */}
          <Form.Item
            label="商品描述"
            name="desc"
            initialValue={desc}
            rules={[{ required: true, message: "请输入商品描述" }]}
          >
            <TextArea autoSize={{ minRows: 2 }} />
          </Form.Item>

          {/* 商品价格 */}
          <Form.Item
            label="商品价格"
            name="price"
            initialValue={price}
            rules={[
              { required: true, message: "请输入商品价格" },
              {
                type: "number",
                min: 0,
                message: "商品价格不能小于0",
                transform: value => parseInt(value),
              },
            ]}
          >
            <Input type="number" addonAfter="元" />
          </Form.Item>

          {/* 商品分类 */}
          <Form.Item
            label="商品分类"
            rules={[{ required: true, message: "请选择商品分类" }]}
          >
            <Cascader
              defaultValue={isUpdate ? [pCategoryId, categoryId] : []}
              options={this.state.options}
              loadData={this.loadData}
              onChange={this.onCascaderChange}
              placeholder="请选择商品分类"
            />
          </Form.Item>

          {/* 商品图片 */}
          <Form.Item label="商品图片">
            <ProductPicturesWall
              ref={c => (this.picturesWall = c)}
              fileList={imgs}
            />
          </Form.Item>

          {/* 商品详情 */}
          <Form.Item
            label="商品详情"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 18 }}
          >
            <RichTextEdit
              ref={c => (this.richTextEditor = c)}
              detail={detail}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}
