import store from '../store';

class Confirmation {
  get data() {
    return store.state.confirmation.data;
  }

  /**
   * Confirm.
   *
   * @param {String} message
   * @param {Object} data
   */
  confirm(message, options = {}) {
    const data = { message, options };
    store.commit('confirmation/set', data);
  }

  /**
   * Remove confirmation.
   */
  remove() {
    store.commit('confirmation/set', null);
  }
}

export const $confirmation = new Confirmation();

export default {
  install(Vue) {
    Vue.prototype.$confirmation = $confirmation;
  },
};
