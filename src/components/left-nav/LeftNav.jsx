import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu } from "antd";
import menuList from "../../config/menuConfig";

import logo from "../../assets/images/logo.png";
import "./LeftNav.less";

const { SubMenu } = Menu;

class LeftNav extends Component {
  // 根据菜单数组生成对应的标签
  getMenuNodes = menuList => {
    return menuList.map(menu => {
      if (!menu.children) {
        return (
          <Menu.Item key={menu.key} icon={menu.icon}>
            <Link to={menu.key}>{menu.title}</Link>
          </Menu.Item>
        );
      }
      const childMenuList = menu.children;
      const pathname = this.props.location.pathname;
      const openItem = childMenuList.find(item => item.key === pathname);
      if (openItem) {
        this.openKey = menu.key;
      }
      return (
        <SubMenu key={menu.key} icon={menu.icon} title={menu.title}>
          {this.getMenuNodes(menu.children)}
        </SubMenu>
      );
    });
  };

  render() {
    const pathname = this.props.location.pathname;
    // 获取菜单的节点列表
    const menuNodes = this.getMenuNodes(menuList);
    console.log(menuNodes);
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img className="logo" src={logo} alt="logo" />
          <h1>后台管理</h1>
        </Link>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[pathname]}
          defaultOpenKeys={[this.openKey]}
        >
          {menuNodes}
        </Menu>
      </div>
    );
  }
}

export default withRouter(LeftNav);
