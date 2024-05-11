<template>
  <RoleForm :role="role" :readonly="true" />
</template>

<script>
import RoleForm from '../../components/roles/RoleForm';
import Role from '../../utils/models/Role';

export default {
  components: { RoleForm },

  data() {
    return { role: null };
  },

  methods: {
    async fetch() {
      ({ data: this.role } = await Role.fetchByID(this.$route.params.id));
    },
  },

  beforeMount() {
    this.fetch();
  },
};
</script>
