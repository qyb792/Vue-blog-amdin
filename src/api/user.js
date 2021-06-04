import request from '@/utils/request'

export function login(data) {
  // 返回一个axios对象 => promise  // 返回了一个promise对象
  return request({
    url: '/login', // 因为所有的接口都要跨域 表示所有的接口要带 /api
    method: 'post',
    data
  })
}

export function getUserInfo() {
  // 返回一个axios对象 => promise
  return request({
    url: '/blogInfo/getBlogInfo',
    method: 'get'
  })
}

export function logout() {

}
