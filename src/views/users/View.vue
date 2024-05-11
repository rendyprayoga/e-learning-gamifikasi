<template>
  <UserForm :user="user" :readonly="true" />
</template>

<script>
import User from '../../utils/models/User';

import UserForm from '../../components/users/UserForm';

export default {
  components: { UserForm },

  data() {
    return { user: null };
  },

  methods: {
    async fetch() {
      ({ data: this.user } = await User.fetchByID(this.$route.params.id));
    },
  },

  beforeMount() {
    this.fetch();
  },
};
</script>
