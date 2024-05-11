export default {
  namespaced: true,

  state: () => ({ data: null, isLoading: false, user: null }),

  mutations: {
    setData: (state, data) => (state.data = data),
    setIsLoading: (state, isLoading) => (state.isLoading = isLoading),
    setUser: (state, user) => (state.user = user),
  },
};
