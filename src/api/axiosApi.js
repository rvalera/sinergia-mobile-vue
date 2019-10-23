import axios from "axios";

export const API_URL_BACKEND = process.env.VUE_APP_API_URL_BACKEND;

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
    errorResponse.message.text = "Error General de la Aplicacion";
  else if (error.response.status == 401)
    errorResponse.message.text = "Credenciales incorrectas";
  else if (error.response.status == 404)
    errorResponse.message.text = "Servicio no disponible";
  else if (error.response.status == 500)
    errorResponse.message.text = "Error de conexión";
  else if (error.response.status == 405 || error.response.status == 406)
    errorResponse.message.text = "Solicitud invalida";
  else errorResponse.message.text = error.response.data.message.text;
  errorResponse.ok = 0;
  errorResponse.message.code = "E999";
  return errorResponse;
}
