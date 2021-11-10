import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { quitLogin } from "../../redux/actions";
import { formatDate } from "../../utils/dateUtil";
import storageUtil from "../../utils/storageUtil";
import LinkButton from "../link-button/LinkButton";
import "./Header.less";
const { confirm } = Modal;

class Header extends Component {
  state = {
    currentTime: formatDate(Date.now()),
  };

  // 获取当前时间
  getTime = () => {
    this.timer = setInterval(() => {
      this.setState({
        currentTime: formatDate(Date.now()),
      });
    }, 1000);
  };

  // 展示是否要退出的模态框
  showConfirm = () => {
    confirm({
      title: "你确定要退出吗？",
      icon: <ExclamationCircleOutlined />,
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        storageUtil.removeUser();
        this.props.quitLogin({});
        // this.props.history.replace("/login");
      },
    });
  };

  componentDidMount() {
    this.getTime();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { currentTime } = this.state;
    const { title } = this.props;
    const { username, role } = this.props.user;
    return (
      <div className="header">
        <div className="header-top">
          <span className="header-top-text">
            欢迎{username}，您的身份是
            <span style={{ fontWeight: "bold" }}>
              {username === "admin" ? "超级管理员" : role.name}
            </span>
          </span>
          <LinkButton onClick={this.showConfirm}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({ title: state.title, user: state.user }), {
  quitLogin,
})(withRouter(Header));
