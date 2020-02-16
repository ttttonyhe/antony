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
    component: () => import('../views/posts.vue'),
    meta:{
      title: 'TonyHe - 文章内容'
    }
  },
  {
    path: '/cate/:id',
    name: 'Cate',
    component: () => import('../views/cates.vue'),
    meta:{
      title: 'TonyHe - 分类文章'
    }
  },
  {
    path: '/tag/:id',
    name: 'Tag',
    component: () => import('../views/tags.vue'),
    meta:{
      title: 'TonyHe - 标签文章'
    }
  },
  {
    path: '/friends',
    name: 'Friends',
    component: () => import('../views/friends.vue'),
    meta:{
      title: 'TonyHe - 友情链接'
    }
  },
  {
    path: '/donation',
    name: 'Donation',
    component: () => import('../views/donation.vue'),
    meta:{
      title: 'TonyHe - 赞助支持'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
