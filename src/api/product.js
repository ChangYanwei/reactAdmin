import request from "./request";

// 删除图片
export function reqRemoveImg(data) {
  return request({
    url: "/manage/img/delete",
    method: "post",
    data,
  });
}

// 获取商品分页列表
export function reqGetProducts(data) {
  return request({
    url: "/manage/product/list",
    params: data,
  });
}

// 添加商品
export function reqAddProduct(data) {
  return request({
    url: "/manage/product/add",
    method: "post",
    data,
  });
}

// 更新商品
export function reqUpdateProduct(data) {
  return request({
    url: "/manage/product/update",
    method: "post",
    data,
  });
}

// 搜索商品
export function reqSearchProduct(data) {
  return request({
    url: "/manage/product/search",
    params: data,
  });
}

// 根据分类id获取分类名称
export function reqGetCategoryName(data) {
  return request({
    url: "/manage/category/info",
    params: data,
  });
}

// 改变商品状态
export function reqChangeStatus(data) {
  return request({
    url: "/manage/product/updateStatus",
    method: "post",
    data,
  });
}
