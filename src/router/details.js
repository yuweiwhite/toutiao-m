const Details = () => import('@/views/details')
export default [
  { path: '/details/:id', component: Details, props: true }
]