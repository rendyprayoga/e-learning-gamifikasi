import get from 'lodash/get';
import store from '../store';

class Alert {
  get data() {
    return store.state.alert.data;
  }

  /**
   * Alert.
   *
   * @param {String} type Theme.
   * @param {String} message Message or object data.
   * @param {Object} options
   */
  alert(type, message, options = {}) {
    const data = { type, message, options };
    store.commit('alert/set', data);
  }

  /**
   * Alert for request success.
   *
   * @param {AxiosResponse} response
   * @param {Object} options
   */
  requestSuccess(response, options) {
    const message = get(response, 'data.data.message');
    this.alert('success', message, options);
  }

  /**
   * Alert for request error.
   *
   * @param {Error} error
   * @param {Object} options
   */
  requestError(error, options) {
    let message = get(error, 'response.data.error.message') || error.message;

    this.alert('danger', message, options);
    console.error(error);
  }

  /**
   * Remove alert.
   */
  remove() {
    store.commit('alert/set', null);
  }
}

export const $alert = new Alert();

export default {
  install(Vue) {
    Vue.prototype.$alert = $alert;
  },
};
