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
