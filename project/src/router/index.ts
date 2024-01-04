import { createRouter, createWebHistory } from 'vue-router'
import { storeUser } from '@/stores'
import NProgress from 'nprogress' //加载条
import 'nprogress/nprogress.css'

NProgress.configure({
  showSpinner: false //  取消加载图标
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
      // 二级路由
      children: [
        {
          path: '/home',
          component: () => import('@/views/Home/index.vue'),
          name: 'home',
          meta: { title: '首页', icon: 'House', keepAlive: true }
        },
        {
          path: '/orders',
          component: () => import('@/views/Orders/index.vue'),
          name: 'orders',
          meta: { title: '订单', icon: 'Tickets', keepAlive: true }
        },
        {
          path: '/more',
          component: () => import('@/views/More/index.vue'),
          name: 'more',
          meta: { title: '更多', icon: 'More' },
          // 三级路由
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
  ]
})

// 白名单
const wihteList = ['/login', '/404']

// 路由前置守卫
router.beforeEach((to) => {
  NProgress.start() //启动加载动画
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
  NProgress.done() //关闭加载动画
})

export default router
