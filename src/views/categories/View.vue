<template>
  <div>
    <h3>Kategori : {{ category.name }}</h3>
    <div class="d-flex flex-wrap mb-2 mb-md-3">
      <div class="me-auto">
        <div class="d-flex justify-content-end me-2">
          <router-link
            v-if="$auth.user.can('categories.create')"
            class="btn btn-primary text-nowrap mb-1"
            to="/categories"
          >
            Kembali
          </router-link>
        </div>
      </div>

      <div class="d-flex justify-content-end">
        <router-link
          v-if="$auth.user.can('questions.create')"
          class="btn btn-primary text-nowrap mb-1"
          :to="`/categories/questions/add/${category.id}`"
        >
          Tambah Pertanyaan
        </router-link>
      </div>
    </div>
    <div class="d-flex flex-wrap mb-4 mb-md-5">
      <div class="me-auto">
        <input
          v-model="input._search"
          type="search"
          class="form-control mb-1"
          placeholder="Pencarian"
        />
      </div>
    </div>
    <QuestionTable :category="category" />
  </div>
</template>

<script>
import Category from '../../utils/models/Category';
import Question from '../../utils/models/Questions';
import QuestionTable from '../../components/questions/QuestionTable.vue';

export default {
  components: { QuestionTable },

  data() {
    return {
      category: {},
      input: {},
      questions: [],
    };
  },

  methods: {
    async fetch() {
      ({ data: this.category } = await Category.fetchByID(
        this.$route.params.id
      ));
    },
    async fetchQuestions() {
      ({ data: this.questions } = await Question.fetch({
        categoryId: this.$route.params.id,
      }));
    },
  },
  watch: {},

  mounted() {
    this.fetch();
    this.fetchQuestions();
  },
};
</script>
