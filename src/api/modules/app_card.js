import { apiHttp } from "../axiosApi.js";
import { appCardsData } from "../config/apiRoute.js";

export const getAppCardsData = () => apiHttp("GET", `${appCardsData}`);
