<template>
  <div>
    <message ref="msgSuccess" class="success">
      <!-- 命名为title插槽内容 -->
      <template v-slot:title="slotProps">
        <strong>{{ slotProps.title }}</strong>
      </template>
      <!-- 默认插槽内容 -->
      <template v-slot:default>新增课程成功!</template>
    </message>
    <message ref="msgWarning" class="warning">
      <!-- 命名为title插槽内容 -->
      <template v-slot:title> <strong>警告</strong> </template>
      <!-- 默认插槽内容 -->
      <template v-slot:default>请输入课程名称!</template>
    </message>
    <cart-add v-model="course" @add-course="addCourse"></cart-add>
    <course-list :courses="courses"></course-list>
  </div>
</template>
<script>
import CartAdd from '@/components/CartAdd.vue';
import CourseList from '@/components/CourseList.vue';
import Message from '@/components/Message.vue';
import { getCourses } from '@/api/course';
export default {
  name: 'app',
  data() {
    return { course: '', courses: [] };
  },
  components: { CartAdd, CourseList, Message },
  async created() {
    // 组件实例已创建，由于未挂载，dom不存在
    const courses = await getCourses();
    this.courses = courses;
  },
  methods: {
    addCourse() {
      if (this.course) {
        // 添加course到数组
        this.courses.push({ name: this.course, price: 8999 });
        this.course = '';
        // 显示提示信息
        // this.show = true 
        this.$refs.msgSuccess.toggle();
      } else {
        // 显示错误信息
        // this.showWarn = true 
        this.$refs.msgWarning.toggle();
      }
    }
  }
};
</script>
