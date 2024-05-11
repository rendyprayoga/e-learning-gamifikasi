<script>
import VueSelect from 'vue-select';
import ChevronDownIcon from 'bootstrap-icons/icons/chevron-down.svg';
import XIcon from 'bootstrap-icons/icons/x.svg';

export default {
  extends: VueSelect,

  props: {
    components: {
      type: Object,
      default: () => ({
        Deselect: {
          render: (h) => h(XIcon, { attrs: { width: '1em', height: '1em' } }),
        },
        OpenIndicator: {
          render: (h) =>
            h(ChevronDownIcon, { attrs: { width: '1em', height: '1em' } }),
        },
      }),
    },
  },
};
</script>

<style lang="scss" scoped>
$vs-component-line-height: $input-line-height;
$vs-component-placeholder-color: $input-placeholder-color;
$vs-border-width: $input-border-width;
$vs-border-color: $input-border-color;
$vs-border-radius: $border-radius;
$vs-controls-color: $text-muted;
$vs-dropdown-box-shadow: 0 0.75rem 1rem rgb(0 0 0 / 15%);
$vs-selected-bg: $border-color;
$vs-state-disabled-bg: $input-disabled-bg;
$vs-state-disabled-cursor: auto;

@import 'vue-select/src/scss/vue-select.scss';

.v-select {
  background: $white;
}

.vs__dropdown-toggle,
.vs__dropdown-menu {
  .vs--open & {
    border-color: $input-focus-border-color;
  }
}

.vs__dropdown-toggle {
  padding-bottom: $input-padding-y;

  .is-invalid & {
    border-color: $form-feedback-invalid-color;
  }
}

.vs__selected-options {
  padding-left: $input-padding-x;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  .vs--single & {
    flex-wrap: nowrap;
  }
}

.vs__selected,
.vs__search,
.vs__search:focus,
.vs__actions {
  margin-top: $input-padding-y;
}

.vs__selected,
.vs__search,
.vs__search:focus {
  border: 0;
}

.vs__search,
.vs__search:focus {
  padding-left: 0;
}

.vs__selected {
  margin-left: 0;
  padding-left: map-get($spacers, 2);
  padding-right: map-get($spacers, 2);
  margin-right: map-get($spacers, 2);

  .vs--single & {
    padding-left: 0;
    padding-right: 0;
    margin-right: 0;
  }
}

.vs__actions {
  padding-right: $input-padding-x;
}

.vs__clear {
  line-height: 1;
  color: $text-muted;
  margin-top: -0.05em;
}

.vs__dropdown-option {
  overflow: hidden;
  text-overflow: ellipsis;
}

.vs__no-options {
  color: $text-muted;
  padding-left: $input-padding-x;
  padding-right: $input-padding-x;
}
</style>
