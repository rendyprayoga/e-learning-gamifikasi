<template>
  <div>
    <div
      class="card"
      v-for="(category, i) of data"
      :key="i"
      style="
        width: 28rem;
        height: 7.5rem;
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
            padding-top: 20px;
            font-size: 20px;
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
              margin-top: 1rem;
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
// import Category from '../../utils/models/Category';

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
