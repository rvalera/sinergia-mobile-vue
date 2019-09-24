import { apiHttp } from "../axiosApi.js";
import { appCardsData, appMovements } from "../config/apiRoute.js";

export const getAppCardsData = () => apiHttp("GET", `${appCardsData}`);

export const getMovementsByCard = validation_number =>
  apiHttp("GET", `${appMovements}/${validation_number}`);
