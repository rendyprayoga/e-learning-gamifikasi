<script>
import Dropdown from 'bootstrap/js/src/dropdown';

export default {
  render() {
    return this.$slots.default;
  },

  mounted() {
    this.dropdown = new Dropdown(this.$el);
  },

  beforeDestroy() {
    this.dropdown.dispose();
  },
};
</script>

<style lang="scss">
@import '../../../node_modules/bootstrap/scss/dropdown';

.dropdown-menu {
  box-shadow: $dropdown-box-shadow;
}
</style>
