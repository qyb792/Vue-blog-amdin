import request from '@/utils/request'

export function login(data) {
  // 返回一个axios对象 => promise  // 返回了一个promise对象
  return request({
    url: '/login', // 因为所有的接口都要跨域 表示所有的接口要带 /api
    method: 'post',
    data
  })
}

// 获取博客主信息
export function getUserInfo() {
  // 返回一个axios对象 => promise
  return request({
    url: '/blogInfo/getBlogInfo',
    method: 'get'
  })
}

// 获取用户列表
export function getUserList(current, size, roleName, nickname) {
  // 返回一个axios对象 => promise
  return request({
    url: '/user/getUserList',
    params: {
      current,
      size,
      roleName,
      nickname
    }
  })
}

// 增加用户
export function addUser(data) {
  return request({
    url: '/admin/users',
    method: 'post',
    data: data

  })
}

// 增加用户
export const csUserList = (data) => {
  return request({
    url: '/user/getUserListSignal',
    method: 'post',
    data

  })
}

export function logout() {

}
