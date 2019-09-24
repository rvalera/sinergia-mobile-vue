import { TRANSACTIONS_APP } from "../mutation-types";

const initialState = {
  transactions_app: {}
};

const state = {
  ...initialState
};

const getters = {
  transactions_app: state => state.transactions_app
};

const mutations = {
  [TRANSACTIONS_APP]: (state, payload) => {
    state.transactions_app = payload;
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
