import { apiHttp } from "../axiosApi.js";
import { transactionPath } from "../config/apiRoute.js";

export const createPaymentApi = body =>
  apiHttp("POST", `${transactionPath}/payment/qr`, body);
