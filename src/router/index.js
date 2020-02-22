import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: resolve => require(['@/views/index'], resolve),
    meta:{
      title: 'TonyHe - Just A Poor Lifesinger'
    }
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: resolve => require(['@/views/main/posts'], resolve),
    meta:{
      title: 'TonyHe - 文章内容'
    }
  },
  {
    path: '/cate/:id',
    name: 'Cate',
    component: resolve => require(['@/views/main/cates'], resolve),
    meta:{
      title: 'TonyHe - 分类文章'
    }
  },
  {
    path: '/tag/:id',
    name: 'Tag',
    component: resolve => require(['@/views/main/tags'], resolve),
    meta:{
      title: 'TonyHe - 标签文章'
    }
  },
  {
    path: '/archive',
    name: 'Archive',
    component: resolve => require(['@/views/main/archive'], resolve),
    meta:{
      title: 'TonyHe - 文章归档'
    }
  },
  {
    path: '/page/:id',
    name: 'Page',
    component: resolve => require(['@/views/main/page'], resolve),
    meta:{
      title: 'TonyHe - 留言板'
    }
  },
  {
    path: '/donation',
    name: 'Donation',
    component: resolve => require(['@/views/complement/donation'], resolve),
    meta:{
      title: 'TonyHe - 赞助支持'
    }
  },
  {
    path: '/comments',
    name: 'Comments',
    component: resolve => require(['@/views/complement/comments'], resolve),
    meta:{
      title: 'TonyHe - 全站评论'
    }
  },
  {
    path: '/music',
    name: 'Music',
    component: resolve => require(['@/views/complement/music'], resolve),
    meta:{
      title: 'TonyHe - 网易云音乐'
    }
  },
  {
    path: "*",
    redirect: "/"
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

export default router
