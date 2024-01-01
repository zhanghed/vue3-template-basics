import { request } from '@/utils/request'

// 登录
export const apiLogin = async (info: {
  username: string
  password: string
}) => {
  return request<
    any,
    {
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
  >({
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

// 链接
export const apiUrl = async () => {
  return request<
    any,
    {
      code: string
      message: string
      data: string
    }
  >({
    url: '/url',
    method: 'get'
  })
}

// 订单列表
export const apiOrders = async (
  condition: object = {},
  skip: number = 0,
  limit: number = 100
) => {
  return request<
    any,
    {
      code: string
      message: string
      data: {
        orders: object[]
        count: number
      }
    }
  >({
    url: '/orders',
    method: 'get',
    params: {
      condition: JSON.stringify(condition),
      skip,
      limit
    }
  })
}
