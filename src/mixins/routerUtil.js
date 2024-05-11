export default {
  methods: {
    /**
     * Navigate to previous route.
     *
     * @param {String} fallback Fallback route path.
     */
    back(fallback) {
      const originPath = this.$route.fullPath;

      this.$router.back();

      this.$nextTick(() => {
        if (originPath === this.$route.fullPath) {
          this.$router.replace(fallback || '/');
        }
      });
    },
  },
};
