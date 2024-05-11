<template>
  <div
    class="modal"
    tabindex="-1"
    role="dialog"
    data-backdrop="static"
    data-keyboard="false"
  >
    <div class="modal-dialog modal-sm modal-dialog-centered">
      <div v-if="$confirmation.data" class="modal-content">
        <div class="modal-body text-center">
          <div class="mb-4" v-html="$confirmation.data.message"></div>

          <div class="d-flex justify-content-center">
            <button
              type="button"
              class="btn btn-outline-secondary me-3"
              :disabled="isLoading"
              @click="cancel"
            >
              Cancel
            </button>

            <button
              type="button"
              class="btn btn-primary"
              :disabled="isLoading"
              @click="OK"
            >
              OK
              <span
                v-if="isLoading"
                class="spinner-border spinner-border-sm ms-1"
                role="status"
                aria-hidden="true"
              ></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BootstrapModal from '../bootstrap/BootstrapModal';

export default {
  extends: BootstrapModal,

  data() {
    return {
      isLoading: false,
    };
  },

  mounted() {
    this.$el.addEventListener('hidden.bs.modal', this.$confirmation.remove);
  },

  methods: {
    /**
     * Cancel.
     */
    cancel() {
      this.modal.hide();
    },

    /**
     * Confirm.
     */
    async OK() {
      if (this.$confirmation.data.options.onOK) {
        this.isLoading = true;

        try {
          await Promise.resolve(this.$confirmation.data.options.onOK());
        } finally {
          this.isLoading = false;
        }
      }

      this.modal.hide();
    },
  },

  watch: {
    '$confirmation.data'(data) {
      data && this.modal.show();
    },
  },
};
</script>
