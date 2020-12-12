const Layout = () => import('@/views/layout')
const Qa = () => import('@/views/qa')
const My = () => import('@/views/my')
const Video = () => import('@/views/video')
const Home = () => import('@/views/home')
export default [
  {
    path: '/', component: Layout, children: [
      { path: '', component: Home },
      { path: '/qa', component: Qa },
      { path: '/my', component: My },
      { path: '/video', component: Video }
    ]
  }

]