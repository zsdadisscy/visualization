import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import FindPassword from '../views/FindPassword.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    alias: '/login',
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
    component: FindPassword,
    title: '找回密码'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
