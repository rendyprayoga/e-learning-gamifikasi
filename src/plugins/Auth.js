import get from 'lodash/get';
import store from '../store';
import api from '../api';
import User from '../utils/models/User';

class Auth {
  constructor() {
    this._initAPI();
    this._load();
  }

  get data() {
    return store.state.auth.data;
  }

  get user() {
    return store.state.auth.user && new User(store.state.auth.user);
  }

  get isLoggedIn() {
    return Boolean(this.user);
  }

  get isLoading() {
    return store.state.auth.isLoading;
  }

  /**
   * Log in.
   *
   * @param {Object} credentials
   */
  async login(credentials) {
    const response = await api.post('core/auth/login', credentials);
    const data = response.data.data;

    this._storeData(data);
    await this._fetchUser();
  }

  /**
   * Log out.
   */
  logout() {
    localStorage.removeItem('auth');
    store.commit('auth/setData', null);
    store.commit('auth/setUser', null);
    this._removeAPIToken();
  }

  watch(expression, callback, options) {
    const unwatch = store.watch(
      () => this[expression],
      function () {
        callback(...arguments);
        options && options.once && unwatch && unwatch();
      },
      options
    );
  }

  /**
   * Load using saved data.
   */
  async _load() {
    store.commit('auth/setIsLoading', true);

    try {
      const saved = JSON.parse(localStorage.getItem('auth') || null);

      if (saved) {
        this._storeData(saved);
        await this._fetchUser();
      }
    } finally {
      store.commit('auth/setIsLoading', false);
    }
  }

  /**
   * Initialize Axios API integration.
   */
  _initAPI() {
    api.interceptors.response.use(
      // Any status code that lie within the range of 2xx cause this function to
      // trigger
      (response) => response,
      // Any status codes that falls outside the range of 2xx cause this
      // function to trigger
      async (error) => {
        const code = get(error, 'response.data.error.code');

        if (code === 'TokenExpiredError') {
          try {
            await this._refreshToken();

            error.config.headers.Authorization =
              api.defaults.headers.common['Authorization'];

            return api.request(error.config);
          } catch (err) {
            console.warn(err);
            this.logout();

            return Promise.reject(error);
          }
        } else if (code === 'TokenInvalidError') {
          this.logout();
          return Promise.reject(error);
        }

        return Promise.reject(error);
      }
    );
  }

  /**
   * Fethc user data.
   */
  async _fetchUser() {
    const response = await api.get(`core/auth/me`);
    store.commit('auth/setUser', response.data.data);
  }

  /**
   * Set API bearer token.
   */
  _setAPIToken() {
    const token = `Bearer ${this.data.accessToken}`;
    api.defaults.headers.common['Authorization'] = token;
  }

  /**
   * Remove API bearer token.
   */
  _removeAPIToken() {
    delete api.defaults.headers.common['Authorization'];
  }

  async _refreshToken() {
    const response = await api.post('core/auth/refresh-token', {
      id: this.data.id,
      refreshToken: this.data.refreshToken,
    });
    const data = response.data.data;

    this._storeData(data);
  }

  _storeData(data) {
    localStorage.setItem('auth', JSON.stringify(data));
    store.commit('auth/setData', data);
    this._setAPIToken();
  }
}

export const $auth = new Auth();

export default {
  install(Vue) {
    Vue.prototype.$auth = $auth;
  },
};
