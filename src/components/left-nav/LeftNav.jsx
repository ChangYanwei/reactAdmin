import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Menu } from "antd";
import menuList from "../../config/menuConfig";
import { setHeadTitle } from "../../redux/actions";

import logo from "../../assets/images/logo.png";
import "./LeftNav.less";

const { SubMenu } = Menu;

class LeftNav extends Component {
  // 判断当前用户是否拥有权限
  hasAuth = menu => {
    const { key, isPublic } = menu;
    const user = this.props.user;
    const menus = user.role.menus;
    // 1.如果是admin用户，拥有所有权限
    // 2.如果当期菜单是公开的，则所有用户都可访问
    if (user.username === "admin" || isPublic) return true;
    // 3.只有admin用户才有角色管理的权限
    if (key === "/role") return false;
    // 4.判断当前要渲染的菜单是否在用户的菜单列表中
    if (menus.indexOf(key) !== -1) return true;
    // 5.如果当前菜单有二级菜单，需要判断二级菜单中是否要渲染。注意二级菜单中也可能有isPublic公开的菜单
    if (menu.children) {
      return (
        menu.children.findIndex(item => {
          return !!item.isPublic || menus.indexOf(item.key) !== -1;
        }) !== -1
      );
    }
    return false;
  };

  // 根据菜单数组生成对应的标签
  getMenuNodes = menuList => {
    const pathname = this.props.location.pathname;

    return menuList.map(menu => {
      if (!this.hasAuth(menu)) return null;
      if (!menu.children) {
        if (pathname === menu.key || pathname.includes(menu.key)) {
          this.props.setHeadTitle(menu.title);
        }

        return (
          <Menu.Item key={menu.key} icon={menu.icon}>
            <Link
              to={menu.key}
              onClick={() => {
                // 更新redux中的title值
                this.props.setHeadTitle(menu.title);
              }}
            >
              {menu.title}
            </Link>
          </Menu.Item>
        );
      }
      const childMenuList = menu.children;

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

// withRouter将一般组件包装成路由组件
// connect将UI组件包装成容器组件
export default connect(state => ({ user: state.user }), { setHeadTitle })(
  withRouter(LeftNav)
);
