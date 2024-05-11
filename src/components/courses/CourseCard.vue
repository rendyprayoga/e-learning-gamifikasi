<template>
  <div
    class="card"
    style="width: 15rem; background-color: #e8c872; border-radius: auto"
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
          style="background-color: white; border-radius: 20px; margin-top: 10px"
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
