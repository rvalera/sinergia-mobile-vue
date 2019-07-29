import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
import modules from "./modules";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {},
  getters,
  mutations,
  actions,
  modules
});
