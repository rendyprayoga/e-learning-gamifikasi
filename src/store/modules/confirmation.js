export default {
  namespaced: true,

  state: () => ({ data: null }),

  mutations: {
    set: (state, data) => (state.data = data),
  },
};
