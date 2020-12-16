import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'
const request = axios.create({
  baseURL: "http://ttapi.research.itcast.cn/", // 基础路径

  // 返回数据自定义会转化JSON, 超过了安全数字就会出现乱码。需要使用插件来转换
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    try {
      return JSONBig.parse(data)
    } catch (err) {
      return data;
    }
  }],

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