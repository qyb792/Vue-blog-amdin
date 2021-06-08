import Layout from '@/layout'

// 文章管理的路由规则
export default {
  // 路由规则
  path: '/article', // 路由地址 /setting
  name: 'article', // 给模块的一级路由添加一个name 这个属性会在后面做权限时用到
  component: Layout,
  meta: {
    title: '文章管理',
    icon: 'el-icon-tickets'
  },
  children: [
    {
      path: '/articlelist',
      component: () => import('@/views/article/ArticleList'),
      name: 'articlelist',
      meta: {
        title: '文章列表',
        icon: 'el-icon-document'
      }
    },
    {
      path: '/addarticle',
      component: () => import('@/views/article/AddArticle'),
      name: 'AddArticle',
      meta: {
        title: '新增文章',
        icon: 'el-icon-folder-add'
      }
    },
    {
      path: '/editarticle/*',
      component: () => import('@/views/article/AddArticle'),
      name: 'editarticle',
      hidden: true,
      meta: {
        title: '修改文章',
        icon: 'el-icon-folder-add'
      }
    },
    {
      path: '/tagManagement',
      component: () => import('@/views/article/TagManagement'),
      name: 'tagManagement',
      meta: {
        title: '标签管理',
        icon: 'el-icon-collection-tag'
      }
    },
    {
      path: '/classification',
      component: () => import('@/views/article/Classification'),
      name: 'Classification',
      meta: {
        title: '分类管理',
        icon: 'el-icon-menu'
      }
    }

  ]
}
