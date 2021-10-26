import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { formatDate } from "../../utils/dateUtil";
import memoryUtil from "../../utils/memoryUtil";
import storageUtil from "../../utils/storageUtil";
import LinkButton from "../link-button/LinkButton";
import "./Header.less";
const { confirm } = Modal;

class Header extends Component {
  state = {
    currentTime: formatDate(Date.now()),
    title: "",
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
        memoryUtil.user = {};
        this.props.history.replace("/login");
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
    return (
      <div className="header">
        <div className="header-top">
          <span className="header-top-text">
            欢迎，{memoryUtil.user.username}
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

export default withRouter(Header);
