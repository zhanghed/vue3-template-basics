// 临时生成当前路由的json字符串
import router from '@/router'
// 递归函数
const temp = (L: any[]) => {
  const arr = []
  for (let i = 0; i < L.length; i++) {
    if (L[i].name) {
      arr.push({ name: L[i].name })
    }
    if (L[i].children && L[i].children.length > 0) {
      Object.defineProperties(arr[i], {
        children: {
          value: temp(L[i].children),
          writable: true,
          enumerable: true,
          configurable: true
        }
      })
    }
  }
  return arr
}
// 路由表
const routerList = router.getRoutes()
// JSON
const a = JSON.stringify({ router: temp(routerList) })
console.log(a)
