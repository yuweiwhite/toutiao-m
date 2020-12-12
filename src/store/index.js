import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
Vue.use(Vuex)
const tokenKey = 'toutiaoUser'
export default new Vuex.Store({
  state: {
    // 首先去本地储存拿数据， 因为页面刷新Vuex是重置。 数据是字符串需要转换成对象
    user: getItem(tokenKey)
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      // 把得到的数据存到本地储存， 页面刷新数据不会丢失
      setItem(tokenKey, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
