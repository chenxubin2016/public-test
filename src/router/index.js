// 使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
import Vue from 'vue'
import VueRouter from 'vue-router'
// 定义 (路由) 组件。
// 可以从其他文件 import 进来
import Home from '@/views/Home.vue'

//路由导航冗余报错（路由重复）
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

// 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        // 当 /:name/:home 匹配成功，
        // HomeListDetail 会被渲染在 Home 的 <router-view> 中
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

// 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数
const router = new VueRouter({
  // 路由的三种运行模式
  // hash: 使用 URL hash 值来作路由。默认模式。
  // history: 依赖 HTML5 History API 和服务器配置。
  // abstract: 支持所有 JavaScript 运行环境，如 Node.js 服务器端。路由再检测不到浏览器API时会自动触发这种模式
  mode: 'hash',
  // 项目部署的上下文路径
  base: process.env.BASE_URL,
  routes
})

// 全局守卫
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
//导出路由实例
export default router
