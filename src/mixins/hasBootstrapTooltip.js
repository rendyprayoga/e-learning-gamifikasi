import Tooltip from 'bootstrap/js/src/tooltip';

const initTooltip = (el) => {
  el.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(
    (el) => new Tooltip(el)
  );
};

export default {
  mounted() {
    initTooltip(this.$el);
  },

  updated() {
    document.querySelectorAll('body > .tooltip').forEach((el) => el.remove());
    initTooltip(this.$el);
  },

  beforeDestroy() {
    this.$el.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => {
      const tooltip = Tooltip.getInstance(el);
      tooltip && tooltip.tip && tooltip.tip.parentNode && tooltip.dispose();
    });
  },
};
