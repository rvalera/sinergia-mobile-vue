import { SET_APP, CLEAN_APP } from "../mutation-types";

import { getAppToken } from "@/api/modules";

const initialState = {
  data: {}
};

const state = {
  ...initialState
};

const getters = {
  app_iv: state => state.data.app_iv,
  app_key: state => state.data.app_key
};

const mutations = {
  [SET_APP]: (state, payload) => {
    state.data = payload;
  },
  [CLEAN_APP]: state => {
    state.data = initialState.data;
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
