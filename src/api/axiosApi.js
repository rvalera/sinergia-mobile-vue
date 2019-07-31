import axios from "axios";
import config from "./config/axiosConfig";

//export const API_URL_BACKEND = "https://bobbot.najoconsultores.com/api";
export const API_URL_BACKEND = process.env.VUE_APP_API_URL_BACKEND;

export const apiHttp = async (verb, endpoint, data, params = {}) => {
  const apiConfiguration = { ...config };

  if (Object.keys(params).length) apiConfiguration.params = params;

  let serviceResponse = { ...customResponse };
  let servicePromise, inputData;
  window.getApp.$emit("LOADING", true);

  verb = verb.toLowerCase();
  switch (verb) {
    case "get":
    case "delete":
      servicePromise = axios[verb](
        `${API_URL_BACKEND}${endpoint}`,
        apiConfiguration
      );
      break;
    case "post":
    case "put":
      inputData = await data;
      servicePromise = axios[verb](
        `${API_URL_BACKEND}${endpoint}`,
        inputData,
        apiConfiguration
      );
      break;
  }

  try {
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
