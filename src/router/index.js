import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import FindPasswordView from '../views/FindPasswordView.vue'
import HomeView from '../views/Homeview.vue'
import NotFoundView from '../views/NotFoundView.vue'
import EditorInfoView from '../views/EditorInfoView.vue'
import ModifyPasswordView from '../views/ModifyPasswordView.vue'
import ModifyProtectionView from '@/views/ModifyProtectionView.vue'

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
    path: '/editorinfo/',
    name: 'editorinfo',
    component: EditorInfoView,
    title: '编辑资料'
  },
  {
    path: '/modifypassword/',
    name: 'modifypasswordview',
    component: ModifyPasswordView,
    title: '修改密码',
  },
  {
    path: '/modifyprotection/',
    name: 'modifyprotection',
    component: ModifyProtectionView,
    title: '修改密保',
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
