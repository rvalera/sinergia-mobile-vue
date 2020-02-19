import {
  LOGIN_USER,
  LOGOUT_USER,
  UPDATE_PERSON,
  UPDATE_AFFILIATE_REQUEST,
  UPDATE_OPERATION_KEY
} from "../mutation-types";

import {
  loginApi,
  updateUserApi,
  createAppPersonApi,
  getCoinApi,
  getMemberProfileApi
} from "@/api/modules";

import router from "@/router";
import { USER_TYPE_WORKSTATION } from "@/config/constants";

const initialState = {
  user: {
    operation_key: "",
    person: {}
  },
  logged: false,
  hasPendingRequest: false
};

const state = {
  ...initialState
};

const getters = {
  user: state => state.user,
  logged: state => state.logged,
  hasPendingRequest: state => state.hasPendingRequest
};

const mutations = {
  [LOGIN_USER]: (state, payload) => {
    state.user = payload;
    state.logged = true;
    if (payload.hasOwnProperty("affiliate"))
      state.hasPendingRequest = payload.affiliate.affiliation_request === "Y";
  },
  [LOGOUT_USER]: state => {
    state.user = initialState.user;
    state.logged = initialState.logged;
    state.hasPendingRequest = initialState.hasPendingRequest;
  },
  [UPDATE_AFFILIATE_REQUEST]: (state, payload) => {
    state.hasPendingRequest = payload;
  },
  [UPDATE_PERSON]: (state, payload) => {
    state.user.person = {
      ...state.user.person,
      ...payload
    };
  },
  [UPDATE_OPERATION_KEY]: (state, payload) => {
    state.user.operation_key = payload;
  }
};

const savePersonId = async () => {
  let serviceResponsePerson = await getMemberProfileApi();
  if (serviceResponsePerson.ok) {
    localStorage.setItem("person_id", serviceResponsePerson.data.id);
    localStorage.setItem("userType", serviceResponsePerson.data.person_type);
    router.push({ name: "Home" });
  }
};

const getCoint = async () => {
  const serviceResponse = await getCoinApi();
  if (serviceResponse.ok) localStorage.coin = serviceResponse.data.diminutive;
  else {
    const params = { text: serviceResponse.message.text };
    window.getApp.$emit("SHOW_ERROR", params);
  }
};

const actions = {
  async loginAction({ commit, dispatch }, payload) {
    let serviceResponse = await loginApi(payload);
    if (serviceResponse.ok) {
      localStorage.setItem("lastEmailLogged", payload.email);
      localStorage.setItem("access_token", serviceResponse.data.access_token);
      localStorage.setItem("refresh_token", serviceResponse.data.refresh_token);
      await getCoint();
      dispatch("getAppToken");
      let serviceResponsePerson = await getMemberProfileApi();
      if (serviceResponsePerson.ok) {
        if (serviceResponsePerson.data.type === USER_TYPE_WORKSTATION) {
          const params = { text: "Credenciales Incorrectas" };
          window.getApp.$emit("SHOW_ERROR", params);
        } else {
          commit(LOGIN_USER, serviceResponsePerson.data);
          localStorage.setItem("user_id", serviceResponsePerson.data.id);
          localStorage.setItem(
            "userType",
            serviceResponsePerson.data.affiliate.type
          );
          localStorage.setItem(
            "person_id",
            serviceResponsePerson.data.affiliate.id
          );
          router.push({ name: "Home" });
        }
      } else {
        router.push({ name: "SignupPage" });
      }
    } else {
      const params = { text: serviceResponse.message.text };
      window.getApp.$emit("SHOW_ERROR", params);
      router.push({ name: "LoginPage" });
    }
  },
  logoutAction({ commit, dispatch }) {
    const lastEmailLogged = localStorage.lastEmailLogged || "";
    localStorage.clear();
    localStorage.setItem("lastEmailLogged", lastEmailLogged);
    commit(LOGOUT_USER);
    dispatch("cleanApp");
    //router.push({ name: "LoginPage" });
  },
  updateAffiliateRequest({ commit }, payload) {
    commit(UPDATE_AFFILIATE_REQUEST, payload);
  },
  async updatePersonAction({ commit }, payload) {
    let serviceResponse = await updateUserApi(payload);
    if (serviceResponse.ok) {
      payload.fullname = payload.first_name + " " + payload.last_name;
      commit(UPDATE_PERSON, payload);
    } else {
      const params = { text: serviceResponse.message.text };
      window.getApp.$emit("SHOW_ERROR", params);
    }
    return serviceResponse;
  },
  async createAppPersonAction({ commit, state }, payload) {
    const { id } = state.user;
    let serviceResponse = await createAppPersonApi(id, payload);
    if (serviceResponse.ok) {
      const params = { text: serviceResponse.message.text };
      window.getApp.$emit("SHOW_MESSAGE", params);
      commit(UPDATE_PERSON, payload);
      await savePersonId(state.user.email);
    } else {
      const params = { text: serviceResponse.message.text };
      window.getApp.$emit("SHOW_ERROR", params);
    }
  },
  updateOperationKey({ commit }, payload) {
    commit(UPDATE_OPERATION_KEY, payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
