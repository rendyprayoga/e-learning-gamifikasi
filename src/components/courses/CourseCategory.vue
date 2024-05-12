<template>
  <div>
    <div
      class="card"
      v-for="(category, i) of data"
      :key="i"
      style="
        width: 15rem;
        height: auto;
        background-color: #e8c872;
        margin-top: 2rem;
        border-radius: 10px;
        box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.05);
      "
    >
      <div class="card-body">
        <h5
          class="card-title"
          style="
            text-align: center;
            padding-left: 10px;
            padding-top: 8px;
            font-size: 17px;
          "
        >
          {{ category.name }}
        </h5>
        <div class="d-flex justify-content-center">
          <button
            type="button"
            class="btn btn-secondary"
            style="
              background-color: whitesmoke;
              border-radius: 10px;
              font-size: 12px;
            "
            @click="goToQuestion(category.id)"
          >
            Pilih Kategori
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return { data: [] };
  },
  methods: {
    goToQuestion(idCategory) {
      this.$router.push(`/courses/question/${idCategory}`);
    },
  },
  props: ['categories'],
  watch: {
    categories: {
      handler(value) {
        this.data = value;
      },
      deep: true,
    },
  },

  created() {
    this.data = this.categories;
  },
};
</script>
<style scoped>
.card {
  width: 85%;
  max-width: 28rem;
  height: auto;
  background-color: #e8c872;
  border-radius: 10px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.05);
}

.card-body {
  padding-top: 0.5rem;
}

.card-title {
  text-align: center;
  font-size: 20px;
}
</style>
