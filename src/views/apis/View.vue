<template>
  <APIForm :api="api" :readonly="true" />
</template>

<script>
import API from '../../utils/models/API';

import APIForm from '../../components/apis/APIForm';

export default {
  components: { APIForm },

  data() {
    return { api: null };
  },

  methods: {
    async fetch() {
      ({ data: this.api } = await API.fetchByID(this.$route.params.id));
    },
  },

  beforeMount() {
    this.fetch();
  },
};
</script>
