import "babel-polyfill";

import Vue from "vue";
import "./plugins/vuetify";
import "./plugins/vuse";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { createI18n } from "./i18n/index";
import "./assets/utils";

import VuetifyConfirm from "vuetify-confirm";
import Vue2Filters from "vue2-filters";
import Toasted from "vue-toasted";
import VueLoading from "vuejs-loading-plugin";

Vue.config.productionTip = false;

const i18n = createI18n();

Vue.use(Vue2Filters);
Vue.use(VuetifyConfirm);
Vue.use(Toasted);
Vue.use(VueLoading);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
