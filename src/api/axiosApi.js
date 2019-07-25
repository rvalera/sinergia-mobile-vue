import axios from "axios";
import config from "./config/axiosConfig";

export const API_URL_BACKEND = "https://bobbot.najoconsultores.com/api";

export const apiHttp = async (verb, endpoint, data, params = {}) => {
  const apiConfiguration = { ...config };

  if (Object.keys(params).length !== 0) {
    apiConfiguration.params = params;
  }
  verb = verb.toUpperCase();
  const serviceResponse = { ...customResponse };
  switch (verb) {
    case "GET":
      try {
        const servicePromise = axios.get(
          `${API_URL_BACKEND}${endpoint}`,
          apiConfiguration
        );
        const [materializedPromise] = await Promise.all([servicePromise]);
        serviceResponse.ok = 1;
        serviceResponse.data = materializedPromise.data.data;
        return serviceResponse;
      } catch (error) {
        return buildErrorMessage(error);
      }
    case "POST":
      try {
        const inputData = await data;
        const servicePromise = axios.post(
          `${API_URL_BACKEND}${endpoint}`,
          inputData,
          apiConfiguration
        );
        const [materializedPromise] = await Promise.all([servicePromise]);
        serviceResponse.ok = 1;
        serviceResponse.data = materializedPromise.data.data;
        return serviceResponse;
      } catch (error) {
        return buildErrorMessage(error);
      }
    case "PUT":
      try {
        const inputData = await data;
        const servicePromise = axios.put(
          `${API_URL_BACKEND}${endpoint}`,
          inputData,
          apiConfiguration
        );
        const [materializedPromise] = await Promise.all([servicePromise]);
        serviceResponse.ok = 1;
        serviceResponse.data = materializedPromise.data.data;
        return serviceResponse;
      } catch (error) {
        return buildErrorMessage(error);
      }
    case "DELETE":
      try {
        const servicePromise = axios.delete(
          `${API_URL_BACKEND}${endpoint}`,
          apiConfiguration
        );
        const [materializedPromise] = await Promise.all([servicePromise]);
        serviceResponse.ok = 1;
        serviceResponse.data = materializedPromise.data.data;
        return serviceResponse;
      } catch (error) {
        return buildErrorMessage(error);
      }
  }
};

function buildErrorMessage(error) {
  if (typeof error.response === "undefined") {
    customResponse.ok = 0;
    customResponse.data.code = "E999";
    customResponse.data.text = "Error General de la Aplicacion";
    return customResponse;
  } else if (error.response.status == 404) {
    customResponse.ok = 0;
    customResponse.data.code = "E999";
    customResponse.data.text = "Servicio no disponible";
    return customResponse;
  } else if (error.response.status == 405 || error.response.status == 406) {
    customResponse.ok = 0;
    customResponse.data.code = "E999";
    customResponse.data.text = "Solicitud invalida";
    return customResponse;
  } else {
    customResponse.ok = 0;
    customResponse.data.text = error.response.data.text;
    return customResponse;
  }
}
var customResponse = {
  ok: 1,
  data: {
    code: String,
    text: String
  }
};
