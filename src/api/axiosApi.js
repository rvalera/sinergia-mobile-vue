import axios from "axios";
import { i18n } from "@/i18n";

export const API_URL_BACKEND = process.env.VUE_APP_API_URL_BACKEND;
const AXIOS_TIMEOUT_MS = process.env.VUE_APP_AXIOS_TIMEOUT_MS;

export const apiHttp = async (method, endpoint, data, options = {}) => {
  const { email, password } = localStorage;
  const defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Basic " + btoa(`${email}:${password}`)
  };

  if (!options.hasOwnProperty("headers")) options.headers = defaultHeaders;

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
    window.getApp.$emit("LOADING", true);
    const [materializedPromise] = await Promise.all([servicePromise]);
    serviceResponse = { ...materializedPromise.data };
  } catch (error) {
    serviceResponse = buildErrorMessage(error);
  }
  window.getApp.$emit("LOADING", false);
  return serviceResponse;
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
  else if (error.response.status == 401)
    errorResponse.message.text = i18n.t("message.apiError401");
  else if (error.response.status == 404)
    errorResponse.message.text = i18n.t("message.apiError404");
  else if (error.response.status == 500)
    errorResponse.message.text = i18n.t("message.apiError500");
  else if (error.response.status == 405 || error.response.status == 406)
    errorResponse.message.text = i18n.t("message.apiError405_406");
  else errorResponse.message.text = error.response.data.message.text;
  errorResponse.ok = 0;
  errorResponse.message.code = "E999";
  return errorResponse;
}
