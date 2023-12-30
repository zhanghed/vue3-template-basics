import router from '@/router'
import { storeUser } from '@/stores'
import type { RouteRecordRaw } from 'vue-router'

// 生成动态路由
const setRouter = (routerList: any[], userRouter: any[]) => {
  const arr = []
  for (let i = 0; i < routerList.length; i++) {
    for (let ii = 0; ii < userRouter.length; ii++) {
      if (routerList[i].name === userRouter[ii].name) {
        arr.push(routerList[i])
        if (routerList[i].children && routerList[i].children.length > 0) {
          routerList[i].children = setRouter(
            routerList[i].children,
            userRouter[ii].children
          )
        }
        break
      }
    }
  }
  return arr
}

// 初始化
export const init = () => {
  const user = storeUser().user
  // 没有用户信息禁止初始化
  if (!user) return

  const routerList = router.getRoutes() //路由表
  const userRouter = JSON.parse(user.router).router //用户路由权限
  const newRouterList = setRouter(routerList, userRouter) //新路由表

  // 添加路由
  newRouterList.forEach((item: RouteRecordRaw) => {
    router.addRoute(item)
  })
}
