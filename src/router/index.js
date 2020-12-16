import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './login.js'
import Layout from './layout.js'
import Search from './search'
import Details from './details'
Vue.use(VueRouter)

const routes = [
  ...Login, ...Layout, ...Search, ...Details
]

const router = new VueRouter({
  routes
})

export default router
