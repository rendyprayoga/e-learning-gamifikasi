<template>
  <SelectField
    valueKey="id"
    :attrs="attrs"
    :value="value"
    :vueSelect="{
      ...vueSelect,
      label: 'name',
      options,
    }"
    :vueSelectOn="{ search: fetchOptions }"
    @input="$emit('input', $event)"
  />
</template>

<script>
import Role from '../../utils/models/Role';

import BaseField from '../forms/BaseField';
import SelectField from '../forms/SelectField';

export default {
  extends: BaseField,

  components: { SelectField },

  props: ['vueSelect'],

  data() {
    return { keyword: '', options: [] };
  },

  computed: {
    params() {
      if (!this.keyword) return {};
      return { _search: this.keyword };
    },
  },

  methods: {
    /**
     * Triggered when the search text changes.
     *
     * @param search  {String}    Current search text
     * @param loading {Function}	Toggle loading class
     */
    fetchOptions(search) {
      this.keyword = search;
    },

    async fetch() {
      ({ data: this.options } = await Role.fetch(this.params));
    },
  },

  mounted() {
    this.fetch();
  },
};
</script>
