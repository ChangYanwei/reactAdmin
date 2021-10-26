import React, { Component } from "react";
import "./LinkButton.less";

export default class LinkButton extends Component {
  render() {
    // 方式1：
    // const { onClick, showConfirm } = this.props;
    // return (
    //   <button onClick={onClick} className="link-button">
    //     {children}
    //   </button>
    // );

    // 方式2：children属性和onClick属性会自动添加到对应的位置
    return <button {...this.props} className="link-button"></button>;
  }
}
