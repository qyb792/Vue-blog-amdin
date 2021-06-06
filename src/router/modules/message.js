import Layout from '@/layout'

// 博客设置的路由规则
export default {
  // 路由规则
  path: '/message', // 路由地址 /setting
  name: 'message', // 给模块的一级路由添加一个name 这个属性会在后面做权限时用到
  component: Layout,
  meta: {
    title: '消息留言',
    icon: 'el-icon-message'
  },
  children: [
    {
      path: '/commentlist',
      component: () => import('@/views/message/Commentlist'),
      name: 'commentlist',
      meta: {
        title: '评论列表',
        icon: 'el-icon-chat-dot-round'
      }
    },
    {
      path: '/messagelist',
      component: () => import('@/views/message/Messagelist'),
      name: 'messagelist',
      meta: {
        title: '留言列表',
        icon: 'el-icon-message'
      }
    }
  ]
}
