# 分享主题



随着互联网不断的发展,MVC模式被MVVM模式取代,大量前端框架应用而生,其中最具代表性的有Vue、React、Angular.由于Vue的易用性,被广泛应用于项目中.那么Vue-router作为Vue的核心模块(插件)您了解它吗?让我们一起来学习和了解Vue-router吧!



# Vue Router



**vue-router是什么？**

首先我们需要知道vue-router是什么，它是干什么的？

这里指的路由并不是指我们平时所说的硬件路由器，这里的路由就是SPA（单页应用）的路径管理器。 换句话说，vue-router就是WebApp的链接路径管理系统。

vue-router是Vue.js官方的路由插件，它和vue.js是深度集成的，适合用于构建单页面应用。



**那与传统的页面跳转有什么区别呢？**

1.vue的单页面应用是基于路由和组件的，路由用于设定访问路径，并将路径和组件映射起来。

2.传统的页面应用，是用一些超链接来实现页面切换和跳转的。

在vue-router单页面应用中，则是路径之间的切换，也就是组件的切换。路由模块的本质 就是建立起url和页面之间的映射关系。

至于为啥不能用a标签，这是因为用Vue做的都是单页应用，就相当于只有一个主的index.html页面，所以你写的标签是不起作用的，必须使用vue-router来进行管理。



**vue-router实现原理**

SPA(single page application):单一页面应用程序，有且只有一个完整的页面；当它在加载页面的时候，不会加载整个页面的内容，而只更新某个指定的容器中内容。

单页面应用(SPA)的核心之一是:

1.更新视图而不重新请求页面;

2.vue-router在实现单页面前端路由时，提供了三种方式：Hash模式、History模式、abstract模式，根据mode参数来决定采用哪一种方式。



[Vue Router][https://router.vuejs.org/zh/] 是 [ Vue.js][https://cn.vuejs.org/] 官方的路由管理器。



## 安装

```
1、使用vue-cli/@vue/cli构建项目的时候安装vue-router
2、vue add router
```



## 基础



#### 起步

基础配置共涉及三步(规划与配置、注入、输出)

1、路由规划、配置，router/index.js

```js
// router.js
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


```





2、注入路由

```js
// main.js
import Vue from 'vue'
import App from '@/App.vue'
// 导入路由实例
import router from '@/router'
import store from '@/store'
import 'normalize.css'
import '@/assets/scss/default.scss'

Vue.config.productionTip = false

const app=new Vue({
  // 将路由实例注入到vue根实例中
  // 我们可以在任何组件内通过 this.$router 访问路由器，也可以通过 this.$route 访问当前路由
  router,
  store,
  render: h => h(App)
}).$mount('#app')
console.log(app)

```



3、匹配成功的路由输出出口

```js
// App.vue
<template>
  <div id="app">
    <div id="nav">
      <!-- 使用 router-link 组件来导航. -->
      <!-- 通过传入 `to` 属性指定链接. -->
      <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
      <router-link to="/">Home</router-link> |
      <router-link to="/admin">Admin</router-link>
    </div>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view/>
  </div>
</template>
```

```js
// Home.vue
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- 列表 -->
    <course-list routerName='HomeListDetail' :courses="courses"></course-list>
    <!-- 路由出口 -->
    <!-- Home页面的子路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>
```



#### 动态路由匹配

我们经常需要把某种模式匹配到的所有路由，全都映射到同个组件。例如，我们有一个 User 组件，对

于所有 ID 各不相同的用户，都要使用这个组件来渲染。那么，我们可以在 vue-router 的路由路径中

使用“动态路径参数”(dynamic segment) 来达到这个效果：

```js
{ path: '/user/:id', component: User }
```



范例：查看课程详情

```js
// views/Detail.vue
<template>
  <div>
    <p>{{ $route.params.id }}</p>
    <p>{{ $route.params.name }}</p>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  watch: {
    $route: {
      handler: () => {
        console.log('$route change');
      },
      immediate: true
    }
  }
};
</script>
```





router/index.js

```js
{
    path: '/detail/:name/:id',
    name: 'Detail',
    component: () => import('@/views/Detail.vue')
}
```





列表中的导航

```js
// CourseList.vue
<template>
  <div class="course-list">
    <ul
      v-for="(item, index) in courses"
      :key="index"
      @click="checkDetail(item)"
    >
      <!-- <router-link :to="`/detail/${item.name}/${item.id}`"> -->
        <li v-for="(em, i) in Object.keys(item)" :key="i">
        <template v-if="em === 'price'">{{ item[em] | addUnit }}</template>
        <template v-else>{{ item[em] }}</template>
      </li>
      <!-- </router-link> -->
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CourseList',
  props: {
    courses: Array
  },
  methods: {
    checkDetail({ id, name }) {
      this.$router.push({ name: 'Detail', params: { id, name } });
    }
  },
  filters: {
    addUnit(target) {
      return '¥ ' + target;
    }
  }
};
</script>

```



##### 通配符

适合做404页面路由

```js
{
		// 会匹配所有路径 
    path:'*',
    component: () => import('@/views/404.vue')
}
```





#### 嵌套路由



实际生活中的应用界面，通常由多层嵌套的组件组合而成。同样地，URL 中各段动态路径也按某种结构

对应嵌套的各层组件，例如：

```
/user/foo/profile 																/user/foo/posts 
+------------------+ 															+-----------------+ 
| User 						 | 															| User 						| 
| +--------------+ | 															| +-------------+ |
| | Profile 		 | | 				+------------> 				| | Posts 			|	|
| | 						 | | 															| | 						| |
| +--------------+ | 															| +-------------+ | 
+------------------+ 															+-----------------+
```

借助 `vue-router`，使用嵌套路由配置，就可以很简单地表达这种关系。



范例：嵌套方式显示详情

```js
// Home
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <course-list routerName='Detail' :courses="courses"></course-list>
    <router-view></router-view>
  </div>
</template>

// CourseList
<template>
  <div class="course-list">
    <ul
      v-for="(item, index) in courses"
      :key="index"
      @click="checkDetail(item)"
    >
      <!-- <router-link :to="`/${item.name}/${item.id}`"> -->
      <li v-for="(em, i) in Object.keys(item)" :key="i">
        <template v-if="em === 'price'">{{ item[em] | addUnit }}</template>
        <template v-else>{{ item[em] }}</template>
      </li>
      <!-- </router-link> -->
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CourseList',
  props: {
    courses: Array,
    routerName: {
      type: String,
      default: ''
    }
  },
  methods: {
    checkDetail({ id, name }) {
      this.$router.push({ name: this.routerName, params: { id, name } });
    }
  },
  filters: {
    addUnit(target) {
      return '¥ ' + target;
    }
  }
};
</script>
```



路由配置

```js
{
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path:':name/:id',
        name:'HomeListDetail',
        component:()=>import('@/views/Detail.vue')
      }
    ]
},
```





响应路由参数变化，

```js
// Detail.vue
export default {
  name: 'Detail',
  watch: {
    $route: {
      handler: () => {
        console.log('$route change');
      },
      immediate: true
    }
  }
};
</script>


```





#### 编程导航



借助 router 的实例方法，可编写代码来实现编程式导航



router.push(location, onComplete?, onAbort?)

在 2.2.0+，可选的在 `router.push` 或 `router.replace` 中提供 `onComplete` 和 `onAbort` 回调作为第二个和第三个参数。这些回调将会在导航成功完成 (在所有的异步钩子被解析之后) 或终止 (导航到相同的路由、或在当前导航完成之前导航到另一个不同的路由) 的时候进行相应的调用。在 3.1.0+，可以省略第二个和第三个参数，此时如果支持 Promise，`router.push` 或 `router.replace` 将返回一个 Promise。

```js
// 字符串 
router.push('home') 

// 对象 
router.push({ path: 'home' }) 

// 命名的路由 
router.push({ name: 'user', params: { userId: '123' }}) 

// 带查询参数，变成 /register?plan=private 
router.push({ path: 'register', query: { plan: 'private' }})

// 将目历史记录中的最后一个地址替换成目标地址
router.replace({path:'/admin'})
```





范例：修改为课程详情跳转为编程导航

```vue
<template>
  <div class="course-list">
    <ul
      v-for="(item, index) in courses"
      :key="index" 
    @click="checkDetail(item)"
    >
    <!-- @click="routerName==='HomeListDetail'?$router.push(`/${item.name}/${item.id}`):$router.push(`/detail/${item.name}/${item.id}`)"
    > -->
      <li v-for="(em, i) in Object.keys(item)" :key="i">
        <template v-if="em === 'price'">{{ item[em] | addUnit }}</template>
        <template v-else>{{ item[em] }}</template>
      </li>
    </ul>
  </div>
</template>
```







#### 命名路由



通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。



你可以在创建 Router 

```js
const router = new VueRouter({ 
  routes: [ 
    { 
      path: '/user/:userId', 
      name: 'user', 
      component: User 
    }
  ] 
})
```





要链接到一个命名路由，可以给 router-link 的 to 属性传一个对象：

```js
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
```





调用 router.push() 时：

```js
router.push({ name: 'user', params: { userId: 123 }})
```





## 进阶



### **路由守卫**

vue-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。有多种机会植入路由导航过程

中：全局的, 单个路由独享的, 或者组件级的。



全局守卫

```js
router.beforeEach((to, from, next) => {
  // to: Route: 即将要进入的目标 路由对象 
  // from: Route: 当前导航正要离开的路由 
  // next: Function: 一定要调用该方法来 resolve 这个钩子。 
})
```





范例：守卫Admin.vue

```js
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
```



```js
{
  path: '/admin',
  name: 'Admin',
  component: () => import('@/views/Admin.vue'),
  meta: {
  auth: true
  }
},
{
  path: '/login',
  name: 'Login',
  component: () => import('@/views/Login.vue')
},
```





```js
<template>
  <div>
    <button @click="login" v-if="!isLogin">登录</button>
    <button @click="loginOut" v-else>注销</button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  computed: {
    isLogin() {
      return window.isLogin;
    }
  },
  methods: {
    // 登录
    login() {
      window.isLogin = true;
      this.$router.addRoutes([
        {
          path: '/admin',
          name: 'Admin',
          component: () => import('@/views/Admin.vue'),
          meta: {
            auth: true
          }
        }
      ]);
      console.log(this.$router);
      this.$router.replace({ path: this.$route.query.redirect });
    },
    // 退出
    loginOut() {
      window.isLogin = false;
    }
  }
};
</script>

<style lang="scss" scoped></style>


```





路由独享的守卫

可以路由配置上直接定义 beforeEnter 守卫：

```js
	{
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Admin.vue'),
    meta: {
      auth: true
    },
    beforeEnter (to, from, next) {
      console.log(to, from)
      if (to.meta.auth) {
        if (window.isLogin) {
          next()
        } else {
          next({ path: `/login?redirect=${to.fullPath}` })
        }
      } else {
        next()
      }
    }
  },
```



组件内守卫

可以在路由组件内直接定义以下路由导航守卫：

+ beforeRouteEnter 

+ beforeRouteUpdate 

+ beforeRouteLeave

```js
	beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    if (to.meta.auth) {
      if (window.isLogin) {
        next();
      } else {
        next({ path: '/login?redirect=' + to.fullPath });
      }
    } else {
      next();
    }
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    next()
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    next()
	}
```





### **数据获取**

路由激活时，获取数据的时机有两个：

+ 路由导航前

  ```js
  // 组件未渲染，通过给next传递回调访问组件实例 
  beforeRouteEnter(to, from, next) {
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当守卫执行前，组件实例还没被创建
      if (to.meta.auth) {
        if (window.isLogin) {
          // 获取页面所需要的数据
          next(async vm => {
            // console.log(vm);
            const courses = await getCourses();
            vm.courses = courses;
          });
        } else {
          next({ path: '/login?redirect=' + to.fullPath });
        }
      } else {
        next();
      }
  },
  
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
  	// 可以访问组件实例 `this`
    next();
  },
  ```
  
  



+ 路由导航后

  ```js
  async created() {
    // 组件实例已创建，由于未挂载，dom不存在
    const courses = await getCourses();
    this.courses = courses;
    console.log(this.$router.options);
  },
  watch: {
    $route: {
      handler: () => {
      // console.log('$route change');
      },
      immediate: true
    }
  },
  ```
  
  



### 动态路由

通过router.addRoutes(routes)方式动态添加路由

```js
// 全局守卫修改为：要求用户必须登录，否则只能去登录页 
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
```



```js
// Login.vue用户登录成功后动态添加/Admin
// 登录
login() {
  window.isLogin = true;
  this.$router.addRoutes([
    {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Admin.vue'),
    meta: {
      auth: true
      }
    }
  ]);
  this.$router.replace({ path: this.$route.query.redirect });
},
```





### 路由组件缓存

利用keepalive做组件缓存，保留组件状态，提高执行效率

范例：缓存Admin组件

```vue
<keep-alive include="Admin"> 
	<router-view></router-view> 
</keep-alive>
```



> 使用include或exclude时要给组件设置name

> 两个特别的生命周期：activated、deactivated



### 路由懒加载

路由组件的懒加载能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应

组件，这样就更加高效了。



```js
() => import("../views/Admin.vue")
```



> 把组件按组分块
>
> ```js
> () => import(/* webpackChunkName: "group-about" */ "../views/Admin.vue")
> ```
>
> 



# 源码解析



vue router 源码目录结构

```

├── build                   // 打包相关配置
├── scripts                 // 构建相关
├── dist                    // 构建后文件目录
├── docs                    // 项目文档
├── docs-gitbook            // gitbook配置
├── examples                // 示例代码，调试的时候使用
├── flow                    // Flow 声明
├── src                     // 源码目录
│   ├── components          // 公共组件
│   ├── history             // 路由类实现
│   ├── util                // 相关工具库
│   ├── create-matcher.js   // 根据传入的配置对象创建路由映射表
│   ├── create-route-map.js // 根据routes配置对象创建路由映射表 
│   ├── index.js            // 主入口
│   └── install.js          // VueRouter装载入口
├── test                    //测试文件
└── types                   // TypeScript 声明
```





