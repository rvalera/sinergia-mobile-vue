import { apiHttp } from "../axiosApi.js";
import { transactionPath } from "../config/apiRoute.js";

export const postRefillApi = body =>
  apiHttp("POST", `${transactionPath}/reload`, body);
