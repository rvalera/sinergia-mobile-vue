import { LOGIN_USER, LOGOUT_USER } from "../mutation-types";

import { loginApi } from "@/api/modules";

import router from "@/router";

const initialState = {
  user: {}
};

const state = {
  ...initialState
};

const getters = {
  user: state => state.user
};

const mutations = {
  [LOGIN_USER]: (state, payload) => {
    state.user = payload;
  },
  [LOGOUT_USER]: state => {
    state.user = {};
  }
};

const actions = {
  async loginAction({ commit }, payload) {
    var serviceResponse = await loginApi(payload);
    if (serviceResponse.ok) {
      if (serviceResponse.data.status === "P")
        router.push({ name: "SignupPage" });
      else router.push({ name: "Home" });
      commit(LOGIN_USER, serviceResponse.data);
      localStorage.setItem("user_id", serviceResponse.data.id);
      localStorage.setItem("email", serviceResponse.data.email);
      localStorage.setItem("password", payload.password);
    } else {
      const params = { text: serviceResponse.data.text };
      window.getApp.$emit("SHOW_ERROR", params);
    }
  },
  logoutAction({ commit }) {
    localStorage.clear();
    commit(LOGOUT_USER);
    //router.push({ name: "LoginPage" });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
