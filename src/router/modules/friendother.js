import Layout from '@/layout'

// 友链其他的路由规则
export default {
  // 路由规则
  path: '/friendother', // 路由地址 /setting
  name: 'friendother', // 给模块的一级路由添加一个name 这个属性会在后面做权限时用到
  component: Layout,
  meta: {
    title: '友链其他',
    icon: 'el-icon-guide'
  },
  children: [
    {
      path: '/ariendlinks',
      component: () => import('@/views/friendother/FriendLinks'),
      name: 'ariendlinks',
      meta: {
        title: '友链列表',
        icon: 'el-icon-link'
      }
    },
    {
      path: '/aboutMe',
      component: () => import('@/views/friendother/AboutMe'),
      name: 'aboutMe',
      meta: {
        title: '关于我',
        icon: 'el-icon-postcard'
      }
    },
    {
      path: '/interfacesdocs',
      component: () => import('@/views/friendother/InterfacesDocs'),
      name: 'interfacesdocs',
      meta: {
        title: '接口文档',
        icon: 'el-icon-postcard'
      }
    }
  ]
}
