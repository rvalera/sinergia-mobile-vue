import axios from "axios";
import router from "@/router";
import { i18n } from "@/i18n";
import { refreshTokenApi } from "./modules";
import { CODES_RESPONSE_TOKEN_EXPIRED } from "@/config/constants";
import { getLatAndLongGeolocation } from "@/utils/helpers";
import { memberPath } from "./config/apiRoute.js";

export const API_URL_BACKEND = process.env.VUE_APP_API_URL_BACKEND;
const AXIOS_TIMEOUT_MS = process.env.VUE_APP_AXIOS_TIMEOUT_MS;

export const apiHttp = async (method, endpoint, data, options = {}) => {
  window.getApp.$loading(true);
  const { access_token } = localStorage;
  const geolocation = await getLatAndLongGeolocation();
  const defaultHeaders = {
    "Geo-Location": geolocation || localStorage.geolocation,
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`
  };

  options.headers = {
    ...defaultHeaders,
    ...options.headers
  };

  let serviceResponse = {};

  method = method.toLowerCase();
  const servicePromise = axios({
    method,
    url: `${API_URL_BACKEND}${endpoint}`,
    data,
    timeout: AXIOS_TIMEOUT_MS,
    ...options
  });

  try {
    const [materializedPromise] = await Promise.all([servicePromise]);
    serviceResponse = { ...materializedPromise.data };
  } catch (error) {
    serviceResponse = buildErrorMessage(error);
  }
  window.getApp.$loading(false);
  if (
    serviceResponse.ok === 0 &&
    CODES_RESPONSE_TOKEN_EXPIRED.includes(serviceResponse.message.code) &&
    endpoint !== `${memberPath}/token/refresh`
  ) {
    console.log("Token expired");
    const updatedToken = await refreshToken(); //Call refresh token
    if (updatedToken) {
      options.headers.Authorization = `Bearer ${localStorage.access_token}`;
      return await apiHttp(method, endpoint, data, options); //recursively call the request again
    } else router.push("/login");
  } else return serviceResponse;
};

function buildErrorMessage(error) {
  console.error(error.response);
  let errorResponse = {
    ok: 0,
    message: {
      code: String,
      text: String
    }
  };
  if (typeof error.response === "undefined")
    errorResponse.message.text = i18n.t("message.apiErrorUndefined");
  else if (
    error.response.hasOwnProperty("data") &&
    error.response.data.hasOwnProperty("message")
  ) {
    errorResponse.message.text = error.response.data.message.text;
    errorResponse.message.code = error.response.data.message.code;
  } else if (error.response.status == 401)
    errorResponse.message.text = i18n.t("message.apiError401");
  else if (error.response.status == 404)
    errorResponse.message.text = i18n.t("message.apiError404");
  else if (error.response.status == 500)
    errorResponse.message.text = i18n.t("message.apiError500");
  else if (error.response.status == 405 || error.response.status == 406)
    errorResponse.message.text = i18n.t("message.apiError405_406");
  else errorResponse.message.text = error.response.data.message.text;
  errorResponse.ok = 0;
  return errorResponse;
}

async function refreshToken() {
  const { refresh_token } = localStorage;
  let serviceResponse = await refreshTokenApi(refresh_token);
  if (serviceResponse.ok) {
    localStorage.setItem("access_token", serviceResponse.data.access_token);
    return true;
  }
  return false;
}
