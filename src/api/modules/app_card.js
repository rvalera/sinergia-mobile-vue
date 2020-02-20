import { apiHttp } from "../axiosApi.js";
import { memberPath } from "../config/apiRoute.js";

export const getCardsApi = params =>
  apiHttp("GET", `${memberPath}/card`, {}, { params });

export const getMovementsApi = params =>
  apiHttp("GET", `${memberPath}/transaction`, {}, { params });

export const updatePinCardApi = (cardId, body) =>
  apiHttp("PUT", `${memberPath}/card/${cardId}/pin`, body);

export const lockCardApi = cardId =>
  apiHttp("PUT", `${memberPath}/card/${cardId}/lock`);

export const unlockCardApi = cardId =>
  apiHttp("PUT", `${memberPath}/card/${cardId}/unlock`);

export const resetPinCardApi = cardId =>
  apiHttp("POST", `${memberPath}/card/${cardId}/pin/reset`);
