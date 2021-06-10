import request from '@/utils/request'

export function getAbout() {
  return request({
    url: '/getAbout',
    method: 'get'
  })
}
export function updateAbout(params) {
  return request({
    url: '/updateAbout',
    method: 'put',
    params
  })
}
