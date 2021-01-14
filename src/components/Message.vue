<template>
  <div class="message" v-if="isShow">
    <!-- 弹窗title -->
    <div class="title">
      <slot name="title" title="Success!"></slot>
    </div>
    <!-- 弹窗内容区域 -->
    <div class="message-content">
      <slot></slot>
    </div>
    <div class="close" @click="isShow = false">X</div>
  </div>
</template>

<script>
export default {
  name: 'Message',
  data() {
    return {
      isShow: false
    };
  },
  created() {
    // console.log(this.$slots);
  },
  methods: {
    toggle() {
      // 显示弹窗
      this.isShow = !this.isShow;
      setTimeout(() => {
        // 关闭弹窗
        this.isShow = false;
      }, 2000);
    }
  }
};
</script>

<style lang="scss" scoped>
.message {
  @include flex;
  padding: 40px;
  position: fixed;
  top: 0;
  width: 100%;
  color: #fff;
}
.success {
  background-color: #42b983;
}
.warning {
  background-color: #f0ad4e;
}
</style>
