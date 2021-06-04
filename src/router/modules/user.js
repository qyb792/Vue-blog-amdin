
import Layout from '@/layout'

export default {
  path: '/users',
  component: Layout,
  name: 'user',
  meta: {
    title: '用户管理'
  },
  children: [
    {
      path: '/users/userlist',
      component: () => import('@/views/user/UserList'),
      name: 'userlist',
      meta: {
        title: '用户列表'
      }
    },
    {
      path: '/users/userlogininfo',
      component: () => import('@/views/user/UserLoginInfo'),
      name: 'userlogininfo',
      meta: {
        title: '登录信息'
      }
    }
  ]
}

// 当你的访问地址 是 /employees的时候 layout组件会显示 此时 你的二级路由的默认组件  也会显示

