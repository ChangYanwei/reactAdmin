// 包含action creator函数的模块
import {
  SET_HEAD_TITLE,
  RECEIVE_USER,
  LOGIN_AGAIN,
  QUIT_LOGIN,
} from "./action-types";
import { message } from "antd";
import { reqLogin } from "../api/login";
import storageUtil from "../utils/storageUtil";

// 设置头部标题的同步action
export const setHeadTitle = data => {
  return {
    type: SET_HEAD_TITLE,
    data,
  };
};

// 登录成功的同步action
export const reveiveUser = data => {
  return {
    type: RECEIVE_USER,
    data,
  };
};

// 登录失败的同步action
export const loginAgain = data => {
  return {
    type: LOGIN_AGAIN,
    data,
  };
};

// 退出登录的action
export const quitLogin = data => {
  return {
    type: QUIT_LOGIN,
    data,
  };
};

// 登录的异步action
export const login = data => {
  return dispatch => {
    // 执行异步ajax请求
    reqLogin(data).then(res => {
      if (res.status === 0) {
        // 如果登录成功，分发成功的action
        message.success("登录成功");
        const user = res.data;
        // 保存用户和权限列表到localStorage中
        storageUtil.saveUser(user);
        dispatch(reveiveUser(user));
      } else {
        // 如果登录失败，分发失败的action
        message.error("用户名或密码错误");
        dispatch(loginAgain({}));
      }
    });
  };
};
