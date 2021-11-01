// 角色相关的api
import request from "./request";

// 获取角色列表
export function reqGetRoles() {
  return request({
    url: "/manage/role/list",
  });
}

// 添加角色
export function reqAddRole(data) {
  return request({
    url: "/manage/role/add",
    method: "post",
    data,
  });
}

// 更新角色权限列表
export function reqUpdateRole(data) {
  return request({
    url: "/manage/role/update",
    method: "post",
    data,
  });
}
