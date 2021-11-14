import storageUtil from "../../utils/storageUtil";
import { RECEIVE_USER, LOGIN_AGAIN, QUIT_LOGIN } from "../action-types";

// 用来管理当前登录用户的reducer
const initUser = storageUtil.getUser();
const user = (state = initUser, action) => {
  const { data, type } = action;
  switch (type) {
    case RECEIVE_USER:
      return data;
    case LOGIN_AGAIN:
      return data;
    case QUIT_LOGIN:
      return data;
    default:
      return state;
  }
};
export default user;
