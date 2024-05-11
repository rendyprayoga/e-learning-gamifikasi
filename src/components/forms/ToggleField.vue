<template>
  <a
    href="#"
    :class="{ on: value, off: !value, 'cursor-default': readonly }"
    @click.prevent="readonly || $emit('input', !value)"
  >
    <ToggleOnIcon v-if="value" />
    <ToggleOffIcon v-else />
    <input
      class="d-none"
      type="checkbox"
      v-bind="attrs"
      :checked="value"
      @input="$emit('input', $event.target.checked)"
    />
  </a>
</template>

<script>
import BaseField from './BaseField';
import ToggleOnIcon from 'bootstrap-icons/icons/toggle-on.svg';
import ToggleOffIcon from 'bootstrap-icons/icons/toggle-off.svg';

export default {
  extends: BaseField,

  components: { ToggleOnIcon, ToggleOffIcon },

  props: ['readonly'],
};
</script>

<style lang="scss" scoped>
.bi {
  height: $line-height-base * $font-size-base;
  width: $line-height-base * $font-size-base;
}

.on {
  color: $success;
}

.off {
  color: #c1c8d6;
}
</style>
