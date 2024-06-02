<template>
  <div>
    <div class="d-flex justify-content-end mb-2">
      <router-link
        v-if="$auth.user.can('categories.create')"
        class="btn btn-primary text-nowrap mb-1"
        style="background-color: #e7b325; color: black; border: none"
        to="/categories/add"
      >
        + Tambah Kategori
      </router-link>
    </div>

    <CategoryTable />
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import pickBy from 'lodash/pickBy';

import CategoryTable from '../../components/categories/CategoryTable';

export default {
  components: { CategoryTable },

  data() {
    return { input: { ...this.$route.query } };
  },

  methods: {
    push() {
      let query = { ...this.$route.query, ...this.input };
      query = pickBy(query, (value) => value !== '');

      this.$router.replace({ query });
    },
  },

  watch: {
    input: {
      handler() {
        this.pushDebounced();
      },
      deep: true,
    },
  },

  created() {
    this.pushDebounced = debounce(this.push, 400);
  },
};
</script>
