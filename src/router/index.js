import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './login.js'
import Layout from './layout.js'
Vue.use(VueRouter)

const routes = [
  ...Login, ...Layout
]

const router = new VueRouter({
  routes
})

export default router
