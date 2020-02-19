import { apiHttp } from "../axiosApi.js";
import { transactionPath } from "../config/apiRoute.js";

export const createTransferApi = body =>
  apiHttp("POST", `${transactionPath}/transfer`, body);
