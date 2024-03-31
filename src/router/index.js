import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import FindPasswordView from '../views/FindPasswordView.vue'
import HomeView from '../views/Homeview.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  {
    path: '/',
    name: 'login/',
    component: LoginView,
    alias: '/login/',
    title: '登录'
  },
  {
    path: '/register/',
    name: 'register',
    component: RegisterView,
    title: '注册'
  },
  {
    path: '/findpassword/',
    name: 'findpassword',
    component: FindPasswordView,
    title: '找回密码'
  },
  {
    path: '/home/',
    name: 'home',
    component: HomeView,
    title: '首页'
  },
  {
    path: '/404/',
    name: '404',
    component: NotFoundView,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
