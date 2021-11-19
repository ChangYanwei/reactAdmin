import React, { Component } from "react";
import { Card, List, Image } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { reqGetCategoryName } from "../../../api/product";
import LinkButton from "../../../components/link-button/LinkButton";
import "./ProductDetail.less";

// product的商品详情子路由组件
export default class ProductDetail extends Component {
  state = {
    name: "",
    desc: "",
    price: 0,
    pCategoryName: "",
    subCategoryName: "",
    imgs: [],
    detail: "",
  };

  componentDidMount() {
    const product = this.props.location.state;
    const { pCategoryId, categoryId } = product;
    this.getCategoryName(pCategoryId, categoryId);
  }

  // 根据分类id获取分类名称
  getCategoryName = (pCategoryId, categoryId) => {
    Promise.all([
      reqGetCategoryName({
        categoryId: pCategoryId,
      }),
      reqGetCategoryName({
        categoryId,
      }),
    ]).then(res => {
      this.setState({
        pCategoryName: res[0].data.name,
        subCategoryName: res[1].data.name,
      });
    });
  };

  render() {
    const { name, desc, price, imgs, detail } = this.props.location.state;
    const { pCategoryName, subCategoryName } = this.state;

    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <ArrowLeftOutlined />
        </LinkButton>
        <span>商品详情</span>
      </span>
    );

    return (
      <Card title={title} className="product-detail">
        <List bordered>
          <List.Item className="product-item">
            <span className="left">商品名称：</span>
            <span>{name}</span>
          </List.Item>
          <List.Item className="product-item">
            <span className="left">商品描述：</span>
            <span>{desc}</span>
          </List.Item>
          <List.Item className="product-item">
            <span className="left">商品价格：</span>
            <span>{price}</span>
          </List.Item>
          <List.Item className="product-item">
            <span className="left">所属分类：</span>
            <span>
              {pCategoryName}-{subCategoryName}
            </span>
          </List.Item>
          <List.Item className="product-item">
            <span className="left">商品图片：</span>
            <span>
              <Image.PreviewGroup>
                {imgs.map(imgName => (
                  <Image
                    key={imgName}
                    width={100}
                    src={`http://localhost:9001/upload/${imgName}`}
                  />
                ))}
              </Image.PreviewGroup>
            </span>
          </List.Item>
          <List.Item className="product-item">
            <span className="left">商品详情：</span>
            {/* 注意__html是两个下划线 */}
            <span dangerouslySetInnerHTML={{ __html: detail }}></span>
          </List.Item>
        </List>
      </Card>
    );
  }
}
