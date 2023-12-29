import { defineStore } from 'pinia'
import { ref } from 'vue'

type typeUser = {
  password: string
  router: string
  menuIndex: string
  status: string
  token: string
  username: string
  _id: string
  avatar: string
}

// 用户信息
export const storeUser = defineStore(
  'storeUser',
  () => {
    // 用户信息
    const user = ref<typeUser>()
    // 设置用户信息
    const setUser = (u: typeUser) => {
      user.value = u
    }
    //设置菜单序号
    const setMenuIndex = (u: string) => {
      user.value!.menuIndex = u
    }
    // 删除
    const delUser = () => {
      user.value = undefined
    }
    return { user, setUser, setMenuIndex, delUser }
  },
  {
    persist: true
  }
)
