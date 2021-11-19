import React, { Component } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { Layout, Tag } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

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
import NotFound from "../not-found/NotFound";

const { Footer, Sider, Content } = Layout;

class Admin extends Component {
  // 动态注册路由
  initDynamicRoutes = user => {
    const routes = {
      "/category": <Route path="/category" component={Category} />,
      "/product": <Route path="/product" component={Product} />,
      "/user": <Route path="/user" component={User} />,
      "/role": <Route path="/role" component={Role} />,
      "/charts/bar": <Route path="/charts/bar" component={Bar} />,
      "/charts/line": <Route path="/charts/line" component={Line} />,
      "/charts/pie": <Route path="/charts/pie" component={Pie} />,
    };

    let routesArr;
    if (user.username === "admin") {
      routesArr = Object.values(routes);
    } else {
      routesArr = user.role.menus.map(path => routes[path]);
    }

    return routesArr;
  };

  render() {
    const user = this.props.user;

    if (!user._id) {
      // 在render函数中一定要返回内容，组件或者html
      return <Redirect to="/login" />;
    }

    const routesArr = this.initDynamicRoutes(user);

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
          <Header>Header</Header>
          <Content style={{ margin: "20px", backgroundColor: "white" }}>
            <Switch>
              <Redirect from="/" to="/home" exact></Redirect>
              <Route path="/home" component={Home} />,{/* 动态注册路由 */}
              {routesArr}
              {/* 如果没有path属性，将匹配所有的路径 */}
              <Route component={NotFound}></Route>
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

export default connect(state => ({ user: state.user }), {})(Admin);
