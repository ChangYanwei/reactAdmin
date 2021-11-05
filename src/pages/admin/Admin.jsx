import React, { Component } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { Layout, Tag } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import memoryUtil from "../../utils/memoryUtil";
import menuList from "../../config/menuConfig";

// 引入子组件
import LeftNav from "../../components/left-nav/LeftNav";
import Header from "../../components/header/Header";
// 二级路由组件
import Home from "../home/Home";
import Category from "../category/Category";
import Product from "../product/Product";
import Role from "../role/Role";
import User from "../user/User";
import Bar from "../charts/Bar";
import Pie from "../charts/Pie";
import Line from "../charts/Line";

const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
  // 获取当前页面的标题
  getTitle = menuList => {
    const pathname = this.props.location.pathname;
    for (let i = 0; i < menuList.length; i++) {
      const menu = menuList[i];
      if (menu.key === pathname) {
        return menu.title;
      }
      if (menu.children) {
        const title = this.getTitle(menu.children);
        if (title) return title;
      }
    }
  };

  render() {
    const user = memoryUtil.user;

    if (!user._id) {
      // 在render函数中一定要返回内容，组件或者html
      return <Redirect to="/login" />;
    }

    const title = this.getTitle(menuList);

    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
          }}
        >
          <LeftNav />
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Header title={title}>Header</Header>
          <Content style={{ margin: "20px", backgroundColor: "white" }}>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/category" component={Category} />
              <Route path="/product" component={Product} />
              <Route path="/user" component={User} />
              <Route path="/role" component={Role} />
              <Route path="/charts/bar" component={Bar} />
              <Route path="/charts/line" component={Line} />
              <Route path="/charts/pie" component={Pie} />
              <Redirect to="/home" />
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            <Tag icon={<GithubOutlined />} color="#55acee">
              <a
                href="https://github.com/ChangYanwei/reactAdmin"
                target="_blank"
                rel="noreferrer"
              >
                源码地址
              </a>
            </Tag>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
