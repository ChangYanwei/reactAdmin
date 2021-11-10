import { combineReducers } from "redux";
import storageUtil from "../utils/storageUtil";
import {
  SET_HEAD_TITLE,
  RECEIVE_USER,
  LOGIN_AGAIN,
  QUIT_LOGIN,
} from "./action-types";

// 用来管理头部标题的reducer
export const title = (state = "首页", action) => {
  switch (action.type) {
    case SET_HEAD_TITLE:
      return action.data;
    default:
      return state;
  }
};

// 用来管理当前登录用户的reducer
const initUser = storageUtil.getUser();
export const user = (state = initUser, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return action.data;
    case LOGIN_AGAIN:
      return action.data;
    case QUIT_LOGIN:
      return action.data;
    default:
      return state;
  }
};

/**
 * 向外默认暴露的是合并产生的总的reducer函数，管理的是总的state的结构
 * {
 *    title:'首页',
 *    user:{}
 * }
 */
export default combineReducers({
  title,
  user,
});
