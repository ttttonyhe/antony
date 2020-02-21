import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/index.vue'),
    meta:{
      title: 'TonyHe - Just A Poor Lifesinger'
    }
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: () => import('../views/main/posts.vue'),
    meta:{
      title: 'TonyHe - 文章内容'
    }
  },
  {
    path: '/cate/:id',
    name: 'Cate',
    component: () => import('../views/main/cates.vue'),
    meta:{
      title: 'TonyHe - 分类文章'
    }
  },
  {
    path: '/tag/:id',
    name: 'Tag',
    component: () => import('../views/main/tags.vue'),
    meta:{
      title: 'TonyHe - 标签文章'
    }
  },
  {
    path: '/archive',
    name: 'Archive',
    component: () => import('../views/main/archive.vue'),
    meta:{
      title: 'TonyHe - 文章归档'
    }
  },
  {
    path: '/page/:id',
    name: 'Page',
    component: () => import('../views/main/page.vue'),
    meta:{
      title: 'TonyHe - 留言板'
    }
  },
  {
    path: '/donation',
    name: 'Donation',
    component: () => import('../views/complement/donation.vue'),
    meta:{
      title: 'TonyHe - 赞助支持'
    }
  },
  {
    path: '/comments',
    name: 'Comments',
    component: () => import('../views/complement/comments.vue'),
    meta:{
      title: 'TonyHe - 全站评论'
    }
  },
  {
    path: '/music',
    name: 'Music',
    component: () => import('../views/complement/music.vue'),
    meta:{
      title: 'TonyHe - 网易云音乐'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
