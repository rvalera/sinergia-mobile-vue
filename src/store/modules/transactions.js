import { TRANSACTIONS_APP, FILTER_APP } from "../mutation-types";
import { getMovements } from "@/api/modules";

const initialState = {
  transactions_app: [],
  filter_app: {}
};

const state = {
  ...initialState
};

const getters = {
  transactions_app: state => state.transactions_app,
  filter_app: state => state.filter_app
};

const mutations = {
  [TRANSACTIONS_APP]: (state, payload) => {
    state.transactions_app = payload;
  },
  [FILTER_APP]: (state, payload) => {
    state.filter_app = payload;
  }
};

const actions = {
  async setTransactionsApp({ commit }, payload) {
    commit(FILTER_APP, payload);
    const { page, perPage } = { page: payload.page, perPage: payload.perPage };
    const { field, order } = { field: "execution_date", order: "DESC" };
    const { filter } = {
      filter: {
        description: payload.description,
        type: payload.type,
        start_date: payload.start_date,
        end_date: payload.end_date,
        [payload.field]: payload.id //blockchain_id or device_id
      }
    };
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({ filter })
    };
    var response = await getMovements(query);
    console.log(response);
    commit(TRANSACTIONS_APP, response.data);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
