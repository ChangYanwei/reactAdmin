import { combineReducers } from "redux";
import storageUtil from "../utils/storageUtil";

// 用来管理头部标题的reducer
export const title = (state = "首页", action) => {
  switch (action.type) {
    case "ACTION_TYPE":
      return;
    default:
      return state;
  }
};

// 用来管理当前登录用户的reducer
const initUser = storageUtil.getUser();
export const user = (state = initUser, action) => {
  switch (action.type) {
    case "ACTION_TYPE":
      return;
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
