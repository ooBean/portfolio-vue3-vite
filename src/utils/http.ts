import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000
});

// 请求拦截器
http.interceptors.request.use(config => {
  // 可添加token等
  return config;
}, error => Promise.reject(error));

// 响应拦截器
http.interceptors.response.use(response => {
  return response;
}, error => {
  // 全局错误处理
  return Promise.reject(error);
});

export default http;