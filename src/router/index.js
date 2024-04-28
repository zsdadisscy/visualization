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
import NProgress from "nprogress"
import 'nprogress/nprogress.css' 
import { judge_online } from '@/user_function/user';

NProgress.inc(0.2)
NProgress.configure({
  easing: 'ease', 
  speed: 500,
  // 关闭圆圈
  showSpinner: false,
})

const routes = [
   {
    path: '/home/',
    name: 'home',
    component: HomeView,
    alias: '/',
    meta : {  
      title: '首页'
    }
  },
  {
    path: '/login/',
    name: 'login',
    component: LoginView,
    // alias: '/login/',
    meta : {
      title: '登录'
    }
  },
  {
    path: '/register/',
    name: 'register',
    component: RegisterView,
    meta : {
      title: '注册'
    }
  },
  {
    path: '/findpassword/',
    name: 'findpassword',
    component: FindPasswordView,
    meta : {
      title: '找回密码'
    }
  },
 
  {
    path: '/editorinfo/',
    name: 'editorinfo',
    component: EditorInfoView,
    meta : {
      title: '编辑资料'
    }
  },
  {
    path: '/modifypassword/',
    name: 'modifypasswordview',
    component: ModifyPasswordView,
    meta : {
      title: '修改密码'
    }
  },
  {
    path: '/modifyprotection/',
    name: 'modifyprotection',
    component: ModifyProtectionView,
    meta : {
      title: '修改密保'
    }
  },
  {
    path: '/myvisual/',
    name: 'myvisual',
    component: MyVisualView,
    meta : {  
      title: '我的可视化'
    }
  },
  {
    path: '/personalization/',
    name: 'personalization',
    component: PersonalizationView,
    meta : {
      title: '个性化'
    }
  },
  {
    path: '/servisual/:job',
    name: 'servisual',
    component: SerVisaulView,
    meta : {
      title: '搜索可视化'
    }
  },
  {
    path: '/map/:job',
    name: 'map',
    component: MapView,
    meta : {
      title: '地图'
    }
  },
  {
    path: '/404/',
    name: '404',
    component: NotFoundView,
    meta : {
      title: '404'
    }
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404/',
    meta : {
      title: '404'
    }
   
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const guestOnlyPaths = [/^\/login\/?$/, /^\/register\/?$/, /^\/findpassword\/?$/];
const authRequiredPaths = [/^\/home\/?$/, /^\/editorinfo\/?$/, /^\/modifypassword\/?$/, /^\/modifyprotection\/?$/, /^\/myvisual\/?$/, /^\/personalization\/?$/, /^\/servisual\/?$/, /^\/map\/?$/];

router.beforeEach((to, from, next) => { 
  NProgress.start();   // 开启进度条

  if (guestOnlyPaths.some(path => path.test(to.path))) {
    if (judge_online()) 
      return router.push('/home/');
  }
  else if (authRequiredPaths.some(path => path.test(to.path))) {
    if (!judge_online()) 
      return router.push('/login/');
  }
  next();
})

router.afterEach((to, from) => {
  NProgress.done();   // 关闭进度条
  document.title = to.meta.title;

})

export default router
