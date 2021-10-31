import axios from "axios";
import { message } from "antd";

export default function request(config) {
  const instance = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 5000,
  });

  // 拦截响应
  instance.interceptors.response.use(response => {
    return response.data;
  });

  return new Promise(resolve => {
    instance(config)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        console.log(err);
        message.error("请求失败，请重试");
      });
  });
}
