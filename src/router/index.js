import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './login.js'
import Layout from './layout.js'
import Search from './search'
Vue.use(VueRouter)

const routes = [
  ...Login, ...Layout, ...Search
]

const router = new VueRouter({
  routes
})

export default router
