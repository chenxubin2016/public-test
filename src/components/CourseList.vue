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
  created(){
    // console.log(this)
  },
  methods: {
    checkDetail({ id, name }) {
      this.$router.push({
        name: this.routerName,
        params: { id, name }
      });
      // this.$router.push({
      //   path: `/${name}/${id}`
      // });
    }
  },
  filters: {
    addUnit(target) {
      return '¥ ' + target;
    }
  }
};
</script>

<style lang="scss" scoped>
.course-list {
  width: 100%;
  padding: 40px;
  ul {
    @include flex;
    // a{
    //   @include flex;
    // }
    li {
      border: 2px solid #e7e7e7;
      border-right: 0;
      border-bottom: 0;
      height: 80px;
      line-height: 80px;
      flex: 2;
      &:nth-of-type(1) {
        flex: 1;
      }
      &:nth-last-of-type(1) {
        border-right: 2px solid #e7e7e7;
      }
    }
    &:nth-last-of-type(1) {
      li {
        border-bottom: 2px solid #e7e7e7;
      }
    }
  }
}
</style>
