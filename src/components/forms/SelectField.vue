<template>
  <VueSelect
    ref="vueSelect"
    v-bind="vueSelect"
    v-model="input"
    v-on="vueSelectOn"
    @input="emitInput"
  >
    <template #search="{ attributes, events }">
      <input
        class="vs__search"
        v-bind="attributes"
        v-on="events"
        :id="attrs && attrs.id"
        :required="attrs && attrs.required && !input"
      />
    </template>

    <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </VueSelect>
</template>

<script>
import find from 'lodash/find';

import BaseField from './BaseField';
import VueSelect from '../vue-select/VueSelect';

export default {
  extends: BaseField,

  components: { VueSelect },

  props: ['valueKey', 'vueSelect', 'vueSelectOn'],

  data() {
    return { input: null };
  },

  watch: {
    value(value) {
      this.loadInput();

      if (value === undefined || value === null) {
        this.$refs.vueSelect.clearSelection();
      }
    },

    'vueSelect.options'() {
      this.loadInput();
    },
  },

  beforeMount() {
    this.loadInput();
  },

  methods: {
    /**
     * Load form with saved value.
     */
    loadInput() {
      this.input = this.vueSelect.multiple
        ? (this.value || []).map(this.parseValue)
        : this.parseValue(this.value);
    },

    /**
     * Parse value to be loaded.
     */
    parseValue(value) {
      return this.valueKey
        ? find(this.vueSelect.options, [this.valueKey, value]) || value
        : value;
    },

    /**
     * Emit input event.
     *
     * @param {Object|undefined} $event
     */
    emitInput($event) {
      const value = this.vueSelect.multiple
        ? ($event || []).map(this.prepareValue)
        : this.prepareValue($event);

      this.$emit('input', value, $event);
    },

    /**
     * Prepare value to be submitted.
     */
    prepareValue(value) {
      return value
        ? this.valueKey && typeof value === 'object'
          ? value[this.valueKey]
          : value
        : value;
    },
  },
};
</script>
