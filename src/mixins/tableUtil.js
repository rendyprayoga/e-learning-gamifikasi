export default {
  methods: {
    getNumber(i) {
      const { _limit = 10, _page = 1 } = this.$route.query;
      return _limit * (_page - 1) + i + 1;
    },
  },
};
