// 用户管理相关的api
import request from "./request";

// 获取用户列表
export function reqGetUsers() {
  return request({
    url: "/manage/user/list",
  });
}

// 添加用户
export function reqAddUser(data) {
  return request({
    url: "/manage/user/add",
    method: "post",
    data,
  });
}

// 更新用户
export function reqUpdateUser(data) {
  return request({
    url: "/manage/user/update",
    method: "post",
    data,
  });
}

// 删除用户
export function reqDeleteUser(data) {
  return request({
    url: "/manage/user/delete",
    method: "post",
    data,
  });
}
