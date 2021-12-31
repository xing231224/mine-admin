/*
 * @Author: your name
 * @Date: 2020-12-10 09:52:15
 * @LastEditTime: 2021-12-30 10:54:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jw-crm\src\utils\request.js
 */
import axios from "axios";
import { Message, Loading } from "element-ui";
import store from "../store";
import router from "../router";
import { getToken, removeToken } from "@/utils/auth";
let loading;
const startLoading = () => {
  loading = Loading.service({
    lock: true,
    text: "加载中……",
    background: "rgba(0, 0, 0, 0.7)"
  });
};
// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 600000 // 请求超时时间  增加时间为10分钟 方便文件上传时做相关处理
});

// request拦截器
service.interceptors.request.use(
  config => {
    // 代理
    config.url = "/api" + config.url;

    if (localStorage.getItem("info")) {
      config.headers["memberId"] = JSON.parse(
        localStorage.getItem("info")
      ).memberId;
    }

    // if (getToken()) {
    //   config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    //   if (config.url.indexOf("/export") != -1) {
    //     config.responseType = 'blob'
    //   }
    // }
    return config;
  },
  error => {
    // Do something with request error
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    // 登录过期
    if (res.status === 401) {
      message(res.msg, "error");
      localStorage.removeItem("info");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
      return Promise.reject(res);
    }
    return response;
  },
  error => {
    const res = error.response;
    if (res.status === 478 || res.status === 403) {
      message(res.status + "： " + res.data.msg, "error");
    } else if (res.status === 400) {
      message(res.status + "： " + res.data.error_description, "error");
    } else if (res.status === 401) {
      //登陆失效
    } else if (res.status === 202) {
      //三方未绑定
      router.push({ path: "/" });
    } else if (res.status === 503) {
      //服务异常
      message("服务更新中，请稍后再试！！！", "error");
    } else {
      message(res.status + "： " + res.data.message, "error");
    }
    return Promise.reject(error);
  }
);

export function message(text, type) {
  Message({
    message: text,
    type: type,
    duration: 5 * 1000
  });
}

export default service;
