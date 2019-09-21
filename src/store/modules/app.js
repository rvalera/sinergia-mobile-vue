import { SET_APP, CLEAN_APP, TITLE_APP } from "../mutation-types";

import { getAppToken } from "@/api/modules";

const initialState = {
  data: {},
  app_title: "Mark-One"
};

const state = {
  ...initialState
};

const getters = {
  app_iv: state => state.data.app_iv,
  app_key: state => state.data.app_key,
  app_title: state => state.app_title
};

const mutations = {
  [SET_APP]: (state, payload) => {
    state.data = payload;
  },
  [CLEAN_APP]: state => {
    state.data = initialState.data;
  },
  [TITLE_APP]: (state, payload) => {
    state.app_title = payload !== undefined ? payload : initialState.app_title;
  }
};

const actions = {
  async getAppToken({ commit }) {
    var serviceResponse = await getAppToken();
    if (serviceResponse.ok) {
      commit(SET_APP, serviceResponse.data);
    } else {
      const params = { text: serviceResponse.message.text };
      window.getApp.$emit("SHOW_ERROR", params);
    }
  },
  setTitleApp({ commit }, payload) {
    commit(TITLE_APP, payload);
  },
  cleanApp({ commit }) {
    commit(CLEAN_APP);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
