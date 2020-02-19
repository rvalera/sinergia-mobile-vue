import { apiHttp } from "../axiosApi.js";
import {
  appCardsData,
  memberPath,
  appCardsPin,
  appCardsUnblock,
  appCardsBlock
} from "../config/apiRoute.js";

export const getAppCardsData = affiliateId =>
  apiHttp("GET", `${appCardsData}/${affiliateId}`);

export const getMovements = params =>
  apiHttp("GET", `${memberPath}/transaction`, {}, { params });

export const updatePinCard = (cardId, body) =>
  apiHttp("PUT", `${appCardsPin}/${cardId}`, body);

export const blockCard = (cardId, body = {}) =>
  apiHttp("PUT", `${appCardsBlock}/${cardId}`, body);

export const unblockCard = (cardId, body = {}) =>
  apiHttp("PUT", `${appCardsUnblock}/${cardId}`, body);
