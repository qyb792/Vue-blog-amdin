import Layout from '@/layout'

// 博客设置的路由规则
export default {
  // 路由规则
  path: '/setting', // 路由地址 /setting
  // name: 'settings', // 给模块的一级路由添加一个name 这个属性会在后面做权限时用到
  component: Layout,

  children: [
    {
      path: '',
      component: () => import('@/views/setting'),
      name: 'setting',
      meta: {
        title: '博客设置',
        icon: 'el-icon-s-tools'
      }
    }
  ]
}
