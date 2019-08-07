import { LOGIN_USER, LOGOUT_USER, UPDATE_PERSON } from "../mutation-types";

import { loginApi, updateUserApi, createAppPersonApi } from "@/api/modules";

import router from "@/router";
import { USER_STATUS_PENDING, USER_TYPE_WORKSTATION } from "@/config/constants";

const initialState = {
  user: {
    person: {}
  },
  crypto: {
    key: "FGLKJGLKJTYLKJVBLKDFFGKLYJPOIIPZ",
    iv: "dslkfjhsdvdsvklj"
  }
};

const state = {
  ...initialState
};

const getters = {
  user: state => state.user,
  crypto: state => state.crypto
};

const mutations = {
  [LOGIN_USER]: (state, payload) => {
    state.user = payload;
  },
  [LOGOUT_USER]: state => {
    state.user = initialState.user;
  },
  [UPDATE_PERSON]: (state, payload) => {
    state.user.person = {
      ...state.user.person,
      ...payload,
      fullname: payload.first_name + " " + payload.last_name
    };
  }
};

const actions = {
  async loginAction({ commit }, payload) {
    var serviceResponse = await loginApi(payload);
    if (serviceResponse.ok) {
      if (serviceResponse.data.type === USER_TYPE_WORKSTATION) {
        const params = { text: "Credenciales Incorrectas" };
        window.getApp.$emit("SHOW_ERROR", params);
      } else {
        commit(LOGIN_USER, serviceResponse.data);
        localStorage.setItem("user_id", serviceResponse.data.id);
        localStorage.setItem("email", serviceResponse.data.email);
        localStorage.setItem("password", payload.password);
        if (serviceResponse.data.status === USER_STATUS_PENDING)
          router.push({ name: "SignupPage" });
        else router.push({ name: "Home" });
      }
    } else {
      const params = { text: serviceResponse.message.text };
      window.getApp.$emit("SHOW_ERROR", params);
      router.push({ name: "LoginPage" });
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
      const params = { text: serviceResponse.message.text };
      window.getApp.$emit("SHOW_MESSAGE", params);
      commit(UPDATE_PERSON, payload);
      router.push({ name: "Home" });
    } else {
      const params = { text: serviceResponse.message.text };
      window.getApp.$emit("SHOW_ERROR", params);
    }
  },
  async createAppPersonAction({ commit, state }, payload) {
    const { id } = state.user;
    var serviceResponse = await createAppPersonApi(id, payload);
    if (serviceResponse.ok) {
      localStorage.setItem("password", payload.password);
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
