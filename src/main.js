import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import authMixin from './mixins/auth';
import Alert from './plugins/Alert';
import Auth from './plugins/Auth';
import Confirmation from './plugins/Confirmation';

import './assets/scss/main.scss';

Vue.config.productionTip = false;

Vue.use(Alert);
Vue.use(Auth);
Vue.use(Confirmation);

new Vue({
  mixins: [authMixin],
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
