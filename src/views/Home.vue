<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <course-list routerName='HomeListDetail' :courses="courses"></course-list>
    <router-view></router-view>
  </div>
</template>

<script>
import CourseList from '@/components/CourseList.vue';
import { getCourses } from '@/api/course';
export default {
  name: 'Home',
  components: {
    CourseList
  },
  data() {
    return {
      courses: []
    };
  },
  async created() {
    // 组件实例已创建，由于未挂载，dom不存在
    const courses = await getCourses();
    this.courses = courses;
  }
};
</script>
