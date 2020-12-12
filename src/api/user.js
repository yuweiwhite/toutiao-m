import request from '@/utils/request'
// data就是外面传递过来的数据， 获取登录接口
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
// 获取短信验证码的接口
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`,
  })
}
// 获取个人信息的接口封装函数，需要带上请求头，请求头在请求拦截器中
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}