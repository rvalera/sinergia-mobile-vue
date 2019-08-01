import axios from "axios";

//export const API_URL_BACKEND = "https://bobbot.najoconsultores.com/api";
export const API_URL_BACKEND = process.env.VUE_APP_API_URL_BACKEND;

export const apiHttp = async (method, endpoint, data, options = {}) => {
  const { email, password } = localStorage;
  const defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Basic " + btoa(`${email}:${password}`)
  };

  if (!options.hasOwnProperty("headers")) options.headers = defaultHeaders;

  let serviceResponse = { ...customResponse };

  method = method.toLowerCase();
  const servicePromise = axios({
    method,
    url: `${API_URL_BACKEND}${endpoint}`,
    data,
    ...options
  });

  try {
    window.getApp.$emit("LOADING", true);
    const [materializedPromise] = await Promise.all([servicePromise]);
    serviceResponse.ok = 1;
    serviceResponse.data = materializedPromise.data.data;
  } catch (error) {
    serviceResponse = buildErrorMessage(error);
  }
  window.getApp.$emit("LOADING", false);
  return serviceResponse;
};

function buildErrorMessage(error) {
  if (typeof error.response === "undefined")
    customResponse.data.text = "Error General de la Aplicacion";
  else if (error.response.status == 404)
    customResponse.data.text = "Servicio no disponible";
  else if (error.response.status == 500)
    customResponse.data.text = "Error de conexión";
  else if (error.response.status == 405 || error.response.status == 406)
    customResponse.data.text = "Solicitud invalida";
  else customResponse.data.text = error.response.data.text;
  customResponse.ok = 0;
  customResponse.data.code = "E999";
  return customResponse;
}

var customResponse = {
  ok: 1,
  data: {
    code: String,
    text: String
  }
};
