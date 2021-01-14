import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

//路由导航冗余报错（路由重复）
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: ':name/:id',
        name: 'HomeListDetail',
        component: () => import('@/views/Detail.vue')
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Admin.vue'),
    meta: {
      auth: true
    },
    // beforeEnter (to, from, next) {
    //   console.log(to, from)
    //   if (to.meta.auth) {
    //     if (window.isLogin) {
    //       next()
    //     } else {
    //       next({ path: `/login?redirect=${to.fullPath}` })
    //     }
    //   } else {
    //     next()
    //   }
    // }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/detail/:name/:id',
    name: 'Detail',
    component: () => import('@/views/Detail.vue')
  },
  {
    path: '*',
    component: () => import('@/views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  console.log(to, from)
  // 不适用于动态添加的路由
  if (to.path === '/admin') {
    if (window.isLogin) {
      next()
    } else {
      next({ path: `/login?redirect=${to.fullPath}` })
    }
  } else {
    next()
  }
})
export default router
