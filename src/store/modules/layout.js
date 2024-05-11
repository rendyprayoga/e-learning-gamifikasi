import debounce from 'lodash/debounce';

const calculateIsSidebarCollapsed = () => innerWidth < 1200;

export const plugin = (store) => {
  const handleResize = debounce(() => {
    store.commit('layout/setIsSidebarCollapsed', calculateIsSidebarCollapsed());
  }, 100);

  addEventListener('resize', handleResize);
};

export default {
  namespaced: true,

  state: () => ({ isSidebarCollapsed: calculateIsSidebarCollapsed() }),

  mutations: {
    setIsSidebarCollapsed: (state, isSidebarCollapsed) =>
      (state.isSidebarCollapsed = isSidebarCollapsed),
  },
};
