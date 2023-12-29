import { request } from '@/utils/request'

type typeReq = {
  username: string
  password: string
}
type typeRes = {
  code: number
  message: string
  data: {
    password: string
    router: string
    menuIndex: string
    status: string
    token: string
    username: string
    _id: string
    avatar: string
  }
}

// 登录
export const apiLogin = async (info: typeReq) => {
  return request<any, typeRes>({
    url: '/api/login',
    method: 'post',
    data: {
      username: info.username,
      password: info.password
    }
  })
}

// 退出
export const apiLogout = async () => {
  return request<any, { code: number; message: string; data: any }>({
    url: '/api/logout',
    method: 'get'
  })
}
