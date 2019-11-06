import { apiHttp } from "../axiosApi.js";
import { coinPath } from "../config/apiRoute.js";

export const getCoinApi = () => apiHttp("GET", `${coinPath}/active`);
