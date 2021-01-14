<template>
  <div>
    <!-- 成功弹窗 -->
    <message ref="msgSuccess" class="success">
      <!-- 命名为title插槽内容 -->
      <template v-slot:title="slotProps">
        <strong>{{ slotProps.title }}</strong>
      </template>
      <!-- 默认插槽内容 -->
      <template v-slot:default>新增课程成功!</template>
    </message>
    <!-- 警告弹窗 -->
    <message ref="msgWarning" class="warning">
      <!-- 命名为title插槽内容 -->
      <template v-slot:title> <strong>警告</strong> </template>
      <!-- 默认插槽内容 -->
      <template v-slot:default>请输入课程名称!</template>
    </message>
    <cart-add v-model="course" @add-course="addCourse"></cart-add>
    <course-list routerName="Detail" :courses="courses"></course-list>
  </div>
</template>
<script>
import CartAdd from '@/components/CartAdd.vue';
import CourseList from '@/components/CourseList.vue';
import Message from '@/components/Message.vue';
import { getCourses, addCourse } from '@/api/course';
export default {
  name: 'Admin',
  data() {
    return {
      course: '',
      courses: []
    };
  },
  components: { CartAdd, CourseList, Message },
  async created() {
    // 组件实例已创建，由于未挂载，dom不存在
    const courses = await getCourses();
    this.courses = courses;
    console.log(this.$router.options);
  },
  methods: {
    addCourse() {
      if (this.course) {
        // 显示提示信息
        // this.show = true
        const params = {
          name: this.course,
          price: 8999
        };
        addCourse(params).then(res => {
          this.course = '';
          this.$refs.msgSuccess.toggle();
          this.courses = res;
        });
      } else {
        // 显示错误信息
        // this.showWarn = true
        this.$refs.msgWarning.toggle();
      }
    }
  },
  // beforeRouteEnter(to, from, next) {
  //   // 在渲染该组件的对应路由被 confirm 前调用
  //   // 不！能！获取组件实例 `this`
  //   // 因为当守卫执行前，组件实例还没被创建
  //   if (to.meta.auth) {
  //     if (window.isLogin) {
  //       // 获取页面所需要的数据
  //       next(async vm => {
  //         // console.log(vm);
  //         // const courses = await getCourses();
  //         // vm.courses = courses;
  //       });
  //     } else {
  //       next({ path: '/login?redirect=' + to.fullPath });
  //     }
  //   } else {
  //     next();
  //   }
  // },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    next();
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    next();
  }
};
</script>
