import { LOGIN_USER, LOGOUT_USER, UPDATE_PERSON } from "../mutation-types";

import { loginApi, updateUserApi } from "@/api/modules";

import router from "@/router";

const initialState = {
  user: {
    person: {}
  }
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
  },
  [UPDATE_PERSON]: (state, payload) => {
    state.user.person = {
      ...state.user.person,
      ...payload
    };
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
      const params = { text: serviceResponse.message.text };
      window.getApp.$emit("SHOW_ERROR", params);
    }
  },
  logoutAction({ commit }) {
    localStorage.clear();
    commit(LOGOUT_USER);
    //router.push({ name: "LoginPage" });
  },
  async updatePersonAction({ commit, state }, payload) {
    const { id } = state.user;
    var serviceResponse = await updateUserApi(id, payload);
    if (serviceResponse.ok) {
      if (payload.hasOwnProperty("password")) {
        localStorage.setItem("password", payload.password);
        delete payload.password;
      }
      const params = { text: serviceResponse.message.text };
      window.getApp.$emit("SHOW_MESSAGE", params);
      commit(UPDATE_PERSON, payload);
      router.push({ name: "Home" });
    } else {
      const params = { text: serviceResponse.message.text };
      window.getApp.$emit("SHOW_ERROR", params);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
