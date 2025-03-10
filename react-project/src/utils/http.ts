// axios 基础封装
import axios from "axios";
import { getToken } from "../utils/index"
//创建实例127.0.0.1:7000
const httpInstance = axios.create({
  baseURL: "http://127.0.0.1:7000", //基地址
  // timeout: 10000, //超时
});

// 添加请求拦截器
httpInstance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // 携带token
    const token = getToken();
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
httpInstance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

//导出
export default httpInstance;