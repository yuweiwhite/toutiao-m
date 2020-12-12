import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: "http://ttapi.research.itcast.cn/" // 基础路径
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  // 拿到vuex中定义的user， 判断是个有数据，或者数据中没有token，未登录状态不需要带上请求头
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});





export default request