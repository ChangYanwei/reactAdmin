import request from "./request";

// 获取分类列表
export function reqGetCategoryList(data) {
  return request({
    url: "/manage/category/list",
    params: data,
  });
}

// 更新分类名称
export function reqUpdateCategoryName(data) {
  return request({
    url: "/manage/category/update",
    method: "post",
    data,
  });
}

// 添加分类
export function reqAddCategory(data) {
  return request({
    url: "/manage/category/add",
    method: "post",
    data,
  });
}
