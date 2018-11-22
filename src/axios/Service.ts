import Axios from "axios";

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
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);
export default service;