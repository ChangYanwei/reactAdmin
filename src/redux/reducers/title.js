// 用来管理头部标题的reducer
import { SET_HEAD_TITLE } from "../action-types";

const title = (state = "首页", action) => {
  switch (action.type) {
    case SET_HEAD_TITLE:
      return action.data;
    default:
      return state;
  }
};

export default title;
