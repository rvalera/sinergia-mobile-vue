import { apiHttp } from "../axiosApi.js";
import { appCardsData, appMovements, appCardsPin } from "../config/apiRoute.js";

export const getAppCardsData = affiliateId =>
  apiHttp("GET", `${appCardsData}/${affiliateId}`);

export const getMovementsByCard = validation_number =>
  apiHttp("GET", `${appMovements}/${validation_number}`);

export const updatePinCard = (cardId, body) =>
  apiHttp("PUT", `${appCardsPin}/${cardId}`, body);
