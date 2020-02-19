import {
  CLEAN_APP,
  TITLE_APP,
  TITLE_BUTTON,
  KEYBOARD
} from "../mutation-types";

import { getAppToken } from "@/api/modules";
import { i18n } from "@/i18n";
const initialState = {
  data: {},
  app_title: "Mark-One",
  keyboardIsUp: false,
  app_button_label: i18n.t("common.continue")
};

const state = {
  ...initialState
};

const getters = {
  app_title: state => state.app_title,
  app_button_label: state => state.app_button_label,
  keyboardIsUp: state => state.keyboardIsUp
};

const mutations = {
  [KEYBOARD]: (state, payload) => {
    state.keyboardIsUp = payload;
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
  async getAppToken() {
    var serviceResponse = await getAppToken();
    if (serviceResponse.ok) {
      localStorage.app_key = serviceResponse.data.app_key;
      localStorage.app_iv = serviceResponse.data.app_iv;
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
  handleKeyboard({ commit }, payload) {
    commit(KEYBOARD, payload);
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
