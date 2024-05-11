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
          v-if="$auth.user.can('roles.create')"
          class="btn btn-primary text-nowrap mb-1"
          to="/roles/add"
        >
          + Tambah
        </router-link>
      </div>
    </div>

    <RoleTable />
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import pickBy from 'lodash/pickBy';

import RoleTable from '../../components/roles/RoleTable';

export default {
  components: { RoleTable },

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
