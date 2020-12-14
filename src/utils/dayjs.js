import Vue from 'vue'
// 导入dayjs插件
import dayjs from 'dayjs'
// 配置dayjs中文简体
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
// 全局配置
dayjs.locale('zh-cn')
// 配置全局过滤器处理时间格式， 使用{{表达式|  relativeTime}}
// 表达式传进来的内容最终会被替换成过滤器的内容
Vue.filter('relativeTime', value => {
  // dayjs()  当前时间   to(dayjs(value))是传过来的时间， 就会算出绝对时间多久前
  return dayjs().to(dayjs(value))
})

