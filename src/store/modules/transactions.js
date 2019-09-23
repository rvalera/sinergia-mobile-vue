import { TRANSACTIONS_APP } from "../mutation-types";

const initialState = {
  trasactions_app: {}
};

const state = {
  ...initialState
};

const getters = {
  trasactions_app: state => state.trasactions_app
};

const mutations = {
  [TRANSACTIONS_APP]: (state, payload) => {
    state.trasactions_app = payload;
  }
};

const actions = {
  setTransactionsApp({ commit }, payload) {
    commit(TRANSACTIONS_APP, payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
