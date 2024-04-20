import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import FindPasswordView from '../views/FindPasswordView.vue'
import HomeView from '../views/Homeview.vue'
import NotFoundView from '../views/NotFoundView.vue'
import EditorInfoView from '../views/EditorInfoView.vue'
import ModifyPasswordView from '../views/ModifyPasswordView.vue'
import ModifyProtectionView from '@/views/ModifyProtectionView.vue'
import MyVisualView from '@/views/MyVisualView.vue'
import PersonalizationView from '@/views/PersonalizationView.vue'
import SerVisaulView from '@/views/SerVisaulView.vue'
import MapView from '@/views/MapView.vue'

const routes = [
   {
    path: '/home/',
    name: 'home',
    component: HomeView,
    alias: '/',
    title: '首页'
  },
  {
    path: '/login/',
    name: 'login',
    component: LoginView,
    // alias: '/login/',
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
    path: '/myvisual/',
    name: 'myvisual',
    component: MyVisualView,
    title: '我的可视化',
  },
  {
    path: '/personalization/',
    name: 'personalization',
    component: PersonalizationView,
    title: '个性化',
  },
  {
    path: '/servisual/:job',
    name: 'servisual',
    component: SerVisaulView,
    title: '搜索可视化·',
  },
  {
    path: '/map/:job',
    name: 'map',
    component: MapView,
    title: '地图',
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
