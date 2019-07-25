import {
  getPairsService,
  cancelPositionService,
  cancelAllPositionsService,
  stopPairService,
  startPairService
} from "../api/modules/apiBoBBot";

const initialState = {
  pairs: [{}],
  initialAmount: 0,
  currentAmount: 0,
  currentGainAmount: 0,
  currentGainPercent: 0
};

const state = {
  pairs: initialState.pairs,
  initialAmount: initialState.initialAmount,
  currentAmount: initialState.currentAmount,
  currentGainAmount: initialState.currentGainAmount,
  currentGainPercent: initialState.currentGainPercent
};

const getters = {
  getPairs(state) {
    return state.pairs;
  },
  getInitialAmount(state) {
    return state.initialAmount;
  },
  getCurrentAmount(state) {
    return state.currentAmount;
  },
  getCurrentGainAmount(state) {
    return state.currentGainAmount;
  },
  getCurrentGainPercent(state) {
    return state.currentGainPercent;
  }
};

const mutations = {
  SET_PAIRS(state, data) {
    state.pairs = data.pairs;
    state.initialAmount = data.total_investment;
    state.currentAmount = data.current_investment_value;
    state.currentGainAmount = data.gain_amount;
    state.currentGainPercent = data.gain_percent;
  },
  CLEAN_PAIRS(state) {
    state.pairs = initialState.pairs;
  }
};

const actions = {
  async refreshPairs({ commit }) {
    var params = { show: true };
    window.getApp.$emit("LOADING", params);

    var serviceResponse = await getPairsService();
    if (serviceResponse.ok == 1) {
      commit("SET_PAIRS", serviceResponse.data);
    } else {
      const params = { text: serviceResponse.data.text };
      window.getApp.$emit("SHOW_ERROR", params);
    }

    params = { show: false };
    window.getApp.$emit("LOADING", params);
  },
  async closePosition({ commit }, payload) {
    var serviceResponse = await cancelPositionService(payload.pair);
    if (serviceResponse.ok == 1) {
      const params = { text: "Positions Closed!" };
      window.getApp.$emit("SHOW_MESSAGE", params);

      serviceResponse = await getPairsService();
      if (serviceResponse.ok == 1) {
        commit("SET_PAIRS", serviceResponse.data);
      } else {
        const params = { text: serviceResponse.data.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    } else {
      const params = { text: serviceResponse.data.text };
      window.getApp.$emit("SHOW_ERROR", params);
    }
  },
  async closeAllPositions({ commit }) {
    var serviceResponse = await cancelAllPositionsService();
    if (serviceResponse.ok == 1) {
      const params = { text: "Positions Closed!" };
      window.getApp.$emit("SHOW_MESSAGE", params);
      serviceResponse = await getPairsService();
      if (serviceResponse.ok == 1) {
        commit("SET_PAIRS", serviceResponse.data);
      } else {
        const params = { text: serviceResponse.data.text };
        window.getApp.$emit("SHOW_MESSAGE", params);
      }
    } else {
      const params = { text: serviceResponse.data.text };
      window.getApp.$emit("SHOW_MESSAGE", params);
    }
  },
  async stopPair({ commit }, payload) {
    var params = { show: true };
    window.getApp.$emit("LOADING", params);

    var serviceResponse = await stopPairService(payload.pair);
    if (serviceResponse.ok == 1) {
      const params = { text: "Pair Stopped!" };
      window.getApp.$emit("SHOW_MESSAGE", params);
      serviceResponse = await getPairsService();
      if (serviceResponse.ok == 1) {
        commit("SET_PAIRS", serviceResponse.data);
      } else {
        const params = { text: serviceResponse.data.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    } else {
      const params = { text: serviceResponse.data.text };
      window.getApp.$emit("SHOW_ERROR", params);
    }

    params = { show: false };
    window.getApp.$emit("LOADING", params);
  },
  async startPair({ commit }, payload) {
    var params = { show: true };
    window.getApp.$emit("LOADING", params);

    var serviceResponse = await startPairService(payload.pair);
    if (serviceResponse.ok == 1) {
      const params = { text: "Pair Started!" };
      window.getApp.$emit("SHOW_MESSAGE", params);
      serviceResponse = await getPairsService();
      if (serviceResponse.ok == 1) {
        commit("SET_PAIRS", serviceResponse.data);
      } else {
        const params = { text: serviceResponse.data.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    } else {
      const params = { text: serviceResponse.data.text };
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
