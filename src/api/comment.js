import request from '@/utils/request'

export function getCommentList(current, size, nickname) {
  return request({
    url: '/comment/getUserCommentList',
    method: 'get',
    params: {
      current,
      size,
      nickname
    }
  })
}
export function delComment(params) {
  return request({
    url: '/admin/comments',
    method: 'delete',
    params
  })
}
