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
  getAppPersonApi
} from "@/api/modules";

import router from "@/router";
import { USER_STATUS_PENDING, USER_TYPE_WORKSTATION } from "@/config/constants";

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

const savePersonId = async email => {
  console.log(email);
  let serviceResponsePerson = await getAppPersonApi(email);
  if (serviceResponsePerson.ok) {
    localStorage.setItem("person_id", serviceResponsePerson.data.id);
    localStorage.setItem("userType", serviceResponsePerson.data.person_type);
    router.push({ name: "Home" });
  }
};

const actions = {
  async loginAction({ commit, dispatch }, payload) {
    let serviceResponse = await loginApi(payload);
    if (serviceResponse.ok) {
      if (serviceResponse.data.type === USER_TYPE_WORKSTATION) {
        const params = { text: "Credenciales Incorrectas" };
        window.getApp.$emit("SHOW_ERROR", params);
      } else {
        console.log(serviceResponse.data);
        commit(LOGIN_USER, serviceResponse.data);
        localStorage.setItem("user_id", serviceResponse.data.id);
        localStorage.setItem("email", serviceResponse.data.email);
        localStorage.setItem("password", payload.password);
        localStorage.setItem("lastEmailLogged", payload.email);
        if (serviceResponse.data.status === USER_STATUS_PENDING)
          router.push({ name: "SignupPage" });
        else {
          localStorage.setItem("userType", serviceResponse.data.affiliate.type);
          localStorage.setItem("person_id", serviceResponse.data.affiliate.id);
          router.push({ name: "Home" });
        }
        dispatch("getAppToken");
      }
    } else {
      const params = { text: serviceResponse.message.text };
      window.getApp.$emit("SHOW_ERROR", params);
      router.push({ name: "LoginPage" });
    }
  },
  logoutAction({ commit, dispatch }) {
    const lastEmailLogged = localStorage.lastEmailLogged;
    localStorage.clear();
    localStorage.setItem("lastEmailLogged", lastEmailLogged);
    commit(LOGOUT_USER);
    dispatch("cleanApp");
    //router.push({ name: "LoginPage" });
  },
  updateAffiliateRequest({ commit }, payload) {
    commit(UPDATE_AFFILIATE_REQUEST, payload);
  },
  async updatePersonAction({ commit, state }, payload) {
    const { id } = state.user;
    let serviceResponse = await updateUserApi(id, payload);
    if (serviceResponse.ok) {
      const params = { text: serviceResponse.message.text };
      window.getApp.$emit("SHOW_MESSAGE", params);
      payload.fullname = payload.first_name + " " + payload.last_name;
      commit(UPDATE_PERSON, payload);
      router.push({ name: "Home" });
    } else {
      const params = { text: serviceResponse.message.text };
      window.getApp.$emit("SHOW_ERROR", params);
    }
  },
  async createAppPersonAction({ commit, state }, payload) {
    const { id } = state.user;
    let serviceResponse = await createAppPersonApi(id, payload);
    if (serviceResponse.ok) {
      localStorage.setItem("password", payload.password);
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
