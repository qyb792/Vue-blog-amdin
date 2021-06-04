import { getUsername, setUsername, removeUsername } from '@/utils/auth'
import { login } from '@/api/user'
const state = {
  username: getUsername(),
  userInfo: {}, // 用户信息列表
  userRoles: [] // 用户角色集合

}
// 修改状态
const mutations = {
  setUsername(state, username) {
    state.username = username // 将数据设置给vuex
    setUsername(username) // 同步给缓存
  },
  // 删除Username
  removeUsername(state) {
    state.username = null // 将vuex的数据置空
    removeUsername() // 同步给缓存
  },

  setUserInfo(state, result) {
    // 更新一个对象
    state.userInfo = result // 这样是响应式
    // state.userInfo = { ...result } // 这样也是响应式 属于浅拷贝
    // state.userInfo['username'] = result // 这样才不是响应式
  },

  // 删除用户资料
  removeUserInfo(state) {
    state.userInfo = {}
  },
  // 删除用户角色数组
  removeUserRoles(state) {
    state.userRoles = []
  },

  setUserRoles(state, userRole) {
    state.userRoles.push(userRole)
  }
}

// 执行异步
const actions = {
  async login(context, data) {
    // 调用api的接口
    const { user } = await login(data) // 拿到用户对象
    // 获取用户的详情
    console.log(user)
    // this.$store.dispatch('user/getRoles', res.user.authorities[0].authority)
    context.commit('setUserInfo', user.user) // 提交到mutations
    context.commit('setUsername', user.username) // 设置token
    context.commit('setUserRoles', user.authorities[0].authority) // 保存用户角色数组

    // setTimeStamp() // 设置当前的时间戳
  },

  // 获取用户资料的actions
  async getUserInfo(context) {
    // 获取用户的详情
    context.commit('setUserInfo')
    // context.commit('setUserInfo', { ...result, ...baseInfo }) // 提交到mutations
    // return result // 这里为什么要return 这里是给我们后期做权限的时候 留下的伏笔
  },

  async logout(context) {
    // 删除用户名
    context.commit('removeUsername')
    // 删除用户资料
    context.commit('removeUserInfo')
    // 删除用户资料
    context.commit('removeUserRoles') // 提交到mutations
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
