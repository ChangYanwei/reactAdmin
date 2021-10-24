import React, { Component } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import memoryUtil from "../../utils/memoryUtil";

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
  render() {
    const user = memoryUtil.user;
    if (!user && !user._id) {
      // 在render函数中一定要返回内容，组件或者html
      return <Redirect to="/login" />;
    }

    return (
      <Layout style={{ height: "100%" }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{ backgroundColor: "white" }}>
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
          <Footer style={{ textAlign: "center" }}>推荐使用谷歌浏览器</Footer>
        </Layout>
      </Layout>
    );
  }
}
