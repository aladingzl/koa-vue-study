import { createRouter, createWebHashHistory } from 'vue-router';
// hash Nginx 不需要配置
import Home from '@/components/Home.vue'

const routes = [
  {
    name: 'home',
    path: '/',
    meta: {
      title: '首页'
    },
    component: Home,
    redirect: '/welcome',
    children: [
      {
        name: 'welcome',
        path: '/welcome',
        meta: {
          title: '欢迎页'
        },
        component: () => import('@/views/welcome.vue')
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    meta: {
      title: '登录页'
    },
    component: () => import('@/views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router