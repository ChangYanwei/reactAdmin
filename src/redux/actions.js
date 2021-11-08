// 包含action creator函数的模块
import { SETHEADTITLE } from "./action-types";
// 设置头部标题的同步action
export const setHeadTitle = data => {
  return {
    type: SETHEADTITLE,
    data,
  };
};
