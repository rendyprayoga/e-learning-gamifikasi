<template>
  <div
    class="card"
    style="
      width: 15rem;
      background-color: #e7b325;
      border-radius: auto;
      box-shadow: 0 6px 10px rgba(0, 0, 0, 0.7), 0 0 6px rgba(0, 0, 0, 0.05);
    "
  >
    <CourseImg />
    <div class="card-body">
      <h5 class="card-title" style="text-align: center; margin-top: 6px">
        Ilmu Pengetahuan Alam
      </h5>
      <div class="d-flex justify-content-center">
        <button
          type="button"
          class="btn btn-secondary"
          style="background-color: white; border-radius: 20px; margin: 0.2rem"
          @click="goToCategory"
        >
          Pilih Course
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import CourseImg from '../../assets/img/course.svg';
export default {
  components: { CourseImg },
  methods: {
    goToCategory() {
      this.$emit('click');
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 32px;
  margin-top: 4rem;
}
</style>
