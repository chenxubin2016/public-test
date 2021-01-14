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
