import request from '@/utils/request'

// 获取友链
export function getFriendLinkList(current, size, nickname) {
  return request({
    url: '/friendLink/listLinks',
    method: 'get',
    params: {
      current,
      size,
      nickname
    }
  })
}

export function addFriendLink(data) {
  return request({
    url: '/friendLink/addOrEditFriendLink',
    method: 'post',
    data
  })
}

// 删除友链
export function delfriendLink(params) {
  return request({
    url: '/links',
    method: 'delete',
    params
  })
}
