import {
  LOGIN_USER,
  LOGOUT_USER,
  UPDATE_PERSON,
  UPDATE_AFFILIATE_REQUEST,
  UPDATE_OPERATION_KEY,
  BALANCE_WALLET
} from "../mutation-types";

import { loginApi, updateUserApi, getMemberProfileApi } from "@/api/modules";

import router from "@/router";
import { USER_TYPE_WORKSTATION, USER_STATUS_PENDING } from "@/config/constants";

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

const actions = {
  async loginAction({ dispatch }, payload) {
    let serviceResponse = await loginApi(payload);
    if (serviceResponse.ok) {
      localStorage.setItem("lastEmailLogged", payload.email);
      localStorage.setItem("access_token", serviceResponse.data.access_token);
      localStorage.setItem("refresh_token", serviceResponse.data.refresh_token);
      if (serviceResponse.data.extra_info.status === USER_STATUS_PENDING)
        router.push({ name: "SignupPage" });
      else dispatch("getProfileAction");
    } else {
      const params = { text: serviceResponse.message.text };
      window.getApp.$emit("SHOW_ERROR", params);
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
  async getProfileAction({ commit, dispatch }) {
    let serviceResponsePerson = await getMemberProfileApi();
    if (serviceResponsePerson.ok) {
      if (serviceResponsePerson.data.type === USER_TYPE_WORKSTATION) {
        const params = { text: "Credenciales Incorrectas" };
        window.getApp.$emit("SHOW_ERROR", params);
      } else {
        await dispatch("getAppToken");
        localStorage.setItem(
          "user",
          JSON.stringify(serviceResponsePerson.data)
        );
        commit(LOGIN_USER, serviceResponsePerson.data);
        localStorage.setItem("user_id", serviceResponsePerson.data.id);
        console.log(serviceResponsePerson.data.id);
        localStorage.setItem("userType", "C");
        // localStorage.setItem(
        //   "userType",
        //   serviceResponsePerson.data.affiliate.type
        // );
        // localStorage.setItem(
        //   "person_id",
        //   serviceResponsePerson.data.affiliate.id
        // );
        router.push({ name: "Home" });
      }
    } else {
      const params = { text: serviceResponsePerson.message.text };
      window.getApp.$emit("SHOW_ERROR", params);
    }
  },
  updateOperationKey({ commit }, payload) {
    commit(UPDATE_OPERATION_KEY, payload);
  },
  keepSignin({ commit }) {
    commit(BALANCE_WALLET, localStorage.balance);
    commit(LOGIN_USER, JSON.parse(localStorage.user));
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
