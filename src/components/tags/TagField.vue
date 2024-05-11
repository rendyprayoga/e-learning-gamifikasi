<template>
  <SelectField
    valueKey="name"
    :attrs="attrs"
    :value="value"
    :vueSelect="{
      label: 'name',
      multiple: true,
      options,
      taggable: true,
      ...vueSelect,
    }"
    :vueSelectOn="{ search: fetchOptions }"
    @input="$emit('input', $event)"
  >
    <template #no-options> Type to search </template>
  </SelectField>
</template>

<script>
import debounce from 'lodash/debounce';
import Tag from '../../utils/models/Tag';

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
      return { _search: this.keyword };
    },
  },

  methods: {
    fetch: debounce(async function () {
      ({ data: this.options } = await Tag.fetch(this.params));
    }, 500),

    /**
     * Triggered when the search text changes.
     *
     * @param search  {String}    Current search text
     * @param loading {Function}	Toggle loading class
     */
    fetchOptions(search) {
      this.keyword = search;
      this.fetch();
    },
  },

  mounted() {
    this.fetch();
  },
};
</script>
