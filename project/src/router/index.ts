import { createRouter, createWebHistory } from 'vue-router'
import { storeUser } from '@/stores'
import NProgress from 'nprogress' //加载条
import 'nprogress/nprogress.css'

NProgress.configure({
  //  取消加载图标
  showSpinner: false
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/Login/index.vue'),
      name: 'login',
      meta: { title: '登录' }
    },
    {
      path: '/',
      component: () => import('@/views/Layout/index.vue'),
      name: 'layout',
      meta: { title: 'layout' },
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: () => import('@/views/Home/index.vue'),
          name: 'home',
          meta: { title: '首页', icon: 'House' }
        },
        {
          path: '/screen',
          component: () => import('@/views/Screen/index.vue'),
          name: 'screen',
          meta: { title: '大屏', icon: 'Monitor' }
        },
        {
          path: '/more',
          component: () => import('@/views/More/index.vue'),
          name: 'more',
          meta: { title: '更多', icon: 'More' },
          children: [
            {
              path: '/about',
              component: () => import('@/views/About/index.vue'),
              name: 'about',
              meta: { title: '关于', icon: 'Operation' }
            }
          ]
        }
      ]
    },
    {
      path: '/404',
      component: () => import('@/views/404/index.vue'),
      name: '404',
      meta: { title: '404' }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
      name: 'any',
      meta: { title: 'any' }
    }
  ],
  // 跳转后滚动位置
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
})

// 白名单
const wihteList = ['/login', '/404']

// 路由前置守卫
router.beforeEach((to) => {
  NProgress.start()
  const useStoreUser = storeUser()
  // 判断token
  if (useStoreUser.user?.token) {
    if (to.path === '/login') {
      return '/'
    }
  } else {
    // 判断白名单
    if (!wihteList.includes(to.path)) {
      return '/login'
    }
  }
})

// 路由后置守卫
router.afterEach(() => {
  NProgress.done()
})

export default router
