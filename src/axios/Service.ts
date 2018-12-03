import { Modal } from "antd";
import Axios from "axios";
import createHashHistory from "history/createHashHistory";

const service = Axios.create({
  timeout: 15000
});

/**
 * 添加请求拦截器(在发送请求之前或之后做什么)
 */
service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

/**
 * 添加响应拦截器
 */
service.interceptors.response.use(
  response => {
    if (response.status) {
      if (response.status === 401) {
        Modal.confirm({ content: "登录信息已过期！请重新登录" });
        createHashHistory().push("/login");
      }
      return response;
    } else {
      return response;
    }
  },
  error => {
    if (error.response.status) {
      if (error.response.status === 500) {
        Modal.error({ content: "服务器错误" });
      }
      if (error.response.status === 504 || error.response.status === 404) {
        Modal.error({ content: "服务器被吃了⊙﹏⊙∥" });
      }
      if (error.response.status === 401) {
        const historyApp = createHashHistory();
        historyApp.push("/login");
      }
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);
export default service;
