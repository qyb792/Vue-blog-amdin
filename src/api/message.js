import request from '@/utils/request'

export function getMessageList(current, size, nickname) {
  return request({
    url: '/message/getMessageList',
    method: 'get',
    params: {
      current,
      size,
      nickname
    }
  })
}
export function delMessage(params) {
  return request({
    url: '/admin/messages',
    method: 'delete',
    params
  })
}
