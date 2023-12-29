import { request } from '@/utils/request'

type typeReq = {
  condition: string
}
type typeRes = {
  code: string
  message: string
  data: {
    orders: object
  }
}

// 获取订单列表
export const apiOrders = async (info: typeReq) => {
  return request<any, typeRes>({
    url: '/orders',
    method: 'get',
    params: {
      condition: info.condition
    }
  })
}
