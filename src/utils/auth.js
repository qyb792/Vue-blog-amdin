import Cookies from 'js-cookie'

const UserKey = 'hrsaas-ihrm-username' // 设置一个独一无二的key
const timeKey = 'hrsaas-timetamp-key' // 设置一个独一无二的key
export function getUsername() {
  return Cookies.get(UserKey)
}

export function setUsername(username) {
  return Cookies.set(UserKey, username)
}

export function removeUsername() {
  return Cookies.remove(UserKey)
}

// 获取时间戳
export function getTimeStamp() {
  return Cookies.get(timeKey)
}

// 读取时间戳
export function setTimeStamp() {
  Cookies.set(timeKey, Date.now())
}
