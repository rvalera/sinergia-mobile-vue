import {
  TRANSACTIONS_APP,
  FILTER_APP,
  BALANCE_WALLET
} from "../mutation-types";
import { getMovementsApi } from "@/api/modules";

const initialState = {
  transactions_app: [],
  filter_app: {},
  balance_wallet: 0
};

const state = {
  ...initialState
};

const getters = {
  transactions_app: state => state.transactions_app,
  filter_app: state => state.filter_app,
  balance_wallet: state => state.balance_wallet
};

const mutations = {
  [TRANSACTIONS_APP]: (state, payload) => {
    state.transactions_app = payload;
  },
  [FILTER_APP]: (state, payload) => {
    state.filter_app = payload;
  },
  [BALANCE_WALLET]: (state, payload) => {
    state.balance_wallet = payload;
  }
};

const actions = {
  async setTransactionsApp({ commit }, payload) {
    commit(FILTER_APP, payload);
    const { page, perPage } = { page: payload.page, perPage: payload.perPage };
    const { field, order } = { field: "execution_date", order: "DESC" };
    const filter = {
      description: payload.description,
      type: payload.type,
      start_date: payload.start_date,
      end_date: payload.end_date,
      [payload.field]: payload.id //blockchain_id or device_id
    };
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter
    };
    var serviceResponse = await getMovementsApi(query);
    if (serviceResponse.ok) commit(TRANSACTIONS_APP, serviceResponse.data);
    else {
      const params = { text: serviceResponse.message.text };
      window.getApp.$emit("SHOW_ERROR", params);
    }
  },
  setBalanceWallet({ commit }, payload) {
    localStorage.balance = payload;
    commit(BALANCE_WALLET, payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
