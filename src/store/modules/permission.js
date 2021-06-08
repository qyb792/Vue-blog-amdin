// vuex的权限模块
import { constantRoutes, asyncRoutes } from '@/router'
// vuex中的permission模块用来存放当前的 静态路由 + 当前用户的 权限路由

const state = {
  // 一开始肯定拥有静态路由的权限
  routes: constantRoutes // 路由表 标识当前用户所拥有的所有路由数组
}
const mutations = {
  // 定义修改routes的mutations
  // payload 是我们登录成功需要添加的动态路由
  setRoutes(state, newRoutes) {
    // 这么写业务是不正确的
    // state.routes = [...state.routes, ...newRoutes]
    state.routes = [...constantRoutes, ...newRoutes] // 每次都是在静态路由上加新的路由
  }
}
const actions = {
  // 筛选权限路由
  // 第二个参数未当前用户所拥有的菜单权限
  // menus: ["settings", "permissions"]
  // asyncRouters是所有的动态路由
  // asyncRoutes [{path: 'setting', 'name', setting}, {}]
  filterRoutes(context, menus) {
    const routes = []
    // 筛选出 动态路由中和menus中能够对上的路由
    menus.forEach(key => {
      // key就是标识
      // asyncRoutes中找有没有name属性等于key的 如果没找到则筛选出来
      routes.push(...asyncRoutes.filter(item => item.name === key)) // 得到一个数组 可能有元素也可能未空
    })
    // 得到的routes是所有模块中满足权限要求的路由数组
    // routes就是当前用户所拥有的动态路由权限
    context.commit('setRoutes', routes) // 将动态路由提交给mutations
    return routes // 这里为什么要return state数据 是用来 显示左侧菜单用的 return 是给路由addRoutes用的
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
