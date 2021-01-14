<template>
  <div class="cart-add">
    <!-- <input type="text" v-model="course" /> -->
    <!-- 等价于 -->
    <!-- <input
      type="text"
      v-bind="course"
      v-on:input="course = $event.target.value"
    /> -->
    <input
      type="text"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @keydown.enter="$emit('add-course')"
    />
    <button @click="$emit('add-course')">Add</button>
  </div>
</template>

<script>
export default {
  name: 'CartAdd',
  props: ['value']
};
</script>

<style lang="scss" scoped>
.cart-add {
  width: 100%;
  padding: 120px 40px 40px 40px;
  @include flex;
  input {
    flex: 5;
    height: 60px;
    border-radius: 0;
    border: 2px solid #ccc;
    padding: 0 20px;
    outline: unset;
  }
  button {
    flex: 1;
    height: 60px;
    border-radius: 0;
    border: 2px solid #ccc;
    background-color: unset;
    border-left: 0;
    outline: unset;
  }
}
</style>
