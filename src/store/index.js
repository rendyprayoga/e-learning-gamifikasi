import Vue from 'vue';
import Vuex from 'vuex';
import alert from './modules/alert';
import auth from './modules/auth';
import confirmation from './modules/confirmation';
import info from './modules/info';
import layout, { plugin as layoutPlugin } from './modules/layout';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { alert, auth, confirmation, info, layout },
  plugins: [layoutPlugin],
});
