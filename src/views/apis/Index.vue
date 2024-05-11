<template>
  <div>
    <div class="d-flex flex-wrap mb-4 mb-md-5">
      <div class="me-auto">
        <input
          v-model="input._search"
          type="search"
          class="form-control mb-1"
          placeholder="Search..."
        />
      </div>

      <div class="d-flex justify-content-end">
        <router-link
          v-if="$auth.user.can('apis.create')"
          class="btn btn-primary text-nowrap mb-1"
          to="/apis/add"
        >
          + Add
        </router-link>
      </div>
    </div>

    <APITable />
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import pickBy from 'lodash/pickBy';

import APITable from '../../components/apis/APITable';

export default {
  components: { APITable },

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
