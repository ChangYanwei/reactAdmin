// 设置头部标题的同步action
import { SET_HEAD_TITLE } from "../action-types";

export const setHeadTitle = data => {
  return {
    type: SET_HEAD_TITLE,
    data,
  };
};
