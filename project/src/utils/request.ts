import { storeUser } from '@/stores'
import router from '@/router'
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 基础配置
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const useStoreUser = storeUser()
    // 携带token
    if (useStoreUser.user?.token && config.headers) {
      config.headers.Authorization = `Bearer ${useStoreUser.user?.token}`
    }
    return config
  },
  (err) => {
    ElMessage({
      type: 'error',
      message: '请求失败'
    })
    Promise.reject(err)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // 业务失败
    if (res.data?.code !== 200) {
      storeUser().delUser() //删用户信息
      ElMessage({
        type: 'error',
        message: '请重新登录'
      })
      router.push({
        path: '/login'
      })
      return Promise.reject(res)
    }
    // 业务成功
    return res.data
  },
  (err) => {
    // 请求失败
    storeUser().delUser() //删用户信息
    ElMessage({
      type: 'error',
      message: '请重新登录'
    })
    router.push({
      path: '/login'
    })
    return Promise.reject(err)
  }
)

export const request = instance.request
