// 配置本地存储的设置方法
export const setItem = (key, val) => {
  // 判断是对象的话需要转换成字符串
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  window.localStorage.setItem(key, val)
}
// 设置本地存储的get方法
export const getItem = (key) => {
  // 拿到本地存储数据需要转换对象，如果是对象就直接返回
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}