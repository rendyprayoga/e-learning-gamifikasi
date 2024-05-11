<template>
  <div
    class="modal-alert modal"
    tabindex="-1"
    role="dialog"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog modal-sm modal-dialog-centered">
      <div v-if="$alert.data" class="modal-content">
        <div class="modal-body text-center">
          <i
            class="d-inline-block fs-1 lh-1 mb-4"
            :class="`bg-${$alert.data.type}-light`"
          >
            <OctagonIcon
              v-if="$alert.data.type === 'danger'"
              :class="`text-${$alert.data.type}`"
            />
            <ExclamationOctagonIcon
              v-else
              :class="`text-${$alert.data.type}`"
            />
          </i>

          <div class="mb-4" v-html="$alert.data.message"></div>

          <div class="d-flex justify-content-center">
            <button
              type="button"
              class="btn"
              :class="`btn-${$alert.data.type}`"
              @click="OK"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BootstrapModal from '../bootstrap/BootstrapModal';
import ExclamationOctagonIcon from 'bootstrap-icons/icons/exclamation-octagon.svg';
import OctagonIcon from 'bootstrap-icons/icons/x-octagon.svg';

export default {
  extends: BootstrapModal,

  components: { ExclamationOctagonIcon, OctagonIcon },

  methods: {
    OK() {
      this.$alert.data.options.onOK && this.$alert.data.options.onOK();
      this.modal.hide();
    },
  },

  watch: {
    '$alert.data'(data) {
      data && this.modal.show();
    },
  },

  mounted() {
    this.$el.addEventListener('hidden.bs.modal', this.$alert.remove);
  },
};
</script>
