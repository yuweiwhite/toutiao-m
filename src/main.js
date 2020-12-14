import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 全局导入dayjs文件
import '@/utils/dayjs.js'
// 全局定义的css文件
import './styles/index.less'
// 导入vant框架
import Vant from 'vant'
// vantcss文件
import 'vant/lib/index.css'
// 动态设置rem包
import 'amfe-flexible'
Vue.config.productionTip = false
Vue.use(Vant)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
