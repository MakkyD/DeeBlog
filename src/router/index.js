import Vue from 'vue'
import VueRouter from 'vue-router'
import createpage from '@/views/createpage.vue'
import Blog from '@/components/Blog.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Blog',
    component: Blog
  },
  {
    path: '/createpage',
    name: 'createpage',
    component: createpage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
