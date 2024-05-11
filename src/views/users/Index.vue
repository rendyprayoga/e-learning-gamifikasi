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
          v-if="$auth.user.can('users.create')"
          class="btn btn-primary text-nowrap mb-1"
          to="/users/add"
        >
          + Tambah
        </router-link>
      </div>
    </div>

    <UserTable />
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import merge from 'lodash/merge';
import pickBy from 'lodash/pickBy';

import UserTable from '../../components/users/UserTable';

const forceOrder = (to, from, next) => {
  if (!to.query._order) {
    next(merge(to, { query: { _order: [['name', 'asc']] } }));
  } else {
    next();
  }
};

export default {
  components: { UserTable },

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

  beforeRouteEnter: forceOrder,
  beforeRouteUpdate: forceOrder,

  created() {
    this.pushDebounced = debounce(this.push, 400);
  },
};
</script>
