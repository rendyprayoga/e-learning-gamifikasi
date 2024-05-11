<script>
import Modal from 'bootstrap/js/src/modal';
import Manipulator from 'bootstrap/js/src/dom/manipulator';

export default {
  mounted() {
    this.modal = new Modal(this.$el, Manipulator.getDataAttributes(this.$el));
  },

  beforeDestroy() {
    this.modal.dispose();
  },
};
</script>

<style lang="scss">
$modal-inner-padding: rem(32);

@import '../../../node_modules/bootstrap/scss/modal';
</style>
