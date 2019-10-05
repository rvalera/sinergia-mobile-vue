import { SET_APP, CLEAN_APP, TITLE_APP, TITLE_BUTTON } from "../mutation-types";

import { getAppToken } from "@/api/modules";

const initialState = {
  data: {},
  app_title: "Mark-One",
  app_button_label: "Pagar"
};

const state = {
  ...initialState
};

const getters = {
  app_iv: state => state.data.app_iv,
  app_key: state => state.data.app_key,
  app_title: state => state.app_title,
  app_button_label: state => state.app_button_label
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
  },

  [TITLE_BUTTON]: (state, payload) => {
    state.app_button_label =
      payload !== undefined ? payload : initialState.app_button_label;
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
  setTitleButton({ commit }, payload) {
    commit(TITLE_BUTTON, payload);
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
