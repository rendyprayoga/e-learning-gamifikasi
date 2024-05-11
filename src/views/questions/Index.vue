<template>
  <div>
    <h3>Daftar Pertanyaan</h3>
    <div class="d-flex flex-wrap">
      <div class="me-auto">
        <input
          v-model="input._search"
          type="search"
          class="form-control mb-1"
          placeholder="Pencarian"
        />
      </div>

      <div class="d-flex justify-content-end">
        <router-link
          v-if="$auth.user.can('questions.create') && $route.query.categoryId"
          class="btn btn-primary text-nowrap mb-1"
          :to="`/questions/add/${$route.query.categoryId}`"
        >
          Tambah Pertanyaan
        </router-link>
      </div>
    </div>
    <div class="me-auto col-md-4 mb-4 mb-md-5">
      <label>Kategori</label>
      <SelectField
        v-model="category"
        placeholder="Select Category"
        valueKey="id"
        :vueSelect="{
          label: 'name',
          options: this.categories,
        }"
        :vueSelectOn="{ search: fetchOptions }"
        @input="$emit('input', $event)"
      />
    </div>
    <QuestionTable :categoryId="$route.query.categoryId" />
  </div>
</template>

<script>
import Category from '../../utils/models/Category';
import QuestionTable from '../../components/questions/QuestionTable';
import SelectField from '../../components/forms/SelectField';
import debounce from 'lodash/debounce';
import pickBy from 'lodash/pickBy';

export default {
  components: { QuestionTable, SelectField },

  data() {
    return {
      category: {},
      categories: [],
      input: {},
    };
  },

  methods: {
    fetchOptions(search) {
      this.keyword = search;
    },
    async fetch() {
      ({ data: this.categories } = await Category.fetch());
    },
    push() {
      let query = { ...this.$route.query, ...this.input };
      query = pickBy(query, (value) => value !== '');

      this.$router.replace({ query });
    },
  },
  watch: {
    category: {
      handler(value) {
        if (value && this.$route.query.categoryId != value) {
          this.$router.push(`/questions?categoryId=${value}`);
        }
      },
    },
    input: {
      handler() {
        this.pushDebounced();
      },
      deep: true,
    },
  },

  async mounted() {
    await this.fetch();
    this.categories.forEach((value) => {
      if (value.id == this.$route.query.categoryId) {
        this.category = value.id;
      }
    });
  },

  created() {
    this.pushDebounced = debounce(this.push, 400);
  },
};
</script>
