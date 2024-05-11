<template>
  <ResetPasswordForm :user="user" />
</template>

<script>
import User from '../../utils/models/User';

import ResetPasswordForm from '../../components/users/ResetPasswordForm';

export default {
  components: { ResetPasswordForm },

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
