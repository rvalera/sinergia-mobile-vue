import { apiHttp } from "../axiosApi.js";
import { memberPath } from "../config/apiRoute.js";

export const getPaymentInstrumentApi = params =>
  apiHttp("GET", `${memberPath}/paymentInstrument`, {}, { params });

export const postPaymentInstrumentApi = body =>
  apiHttp("POST", `${memberPath}/paymentInstrument`, body);

export const deletePaymentInstrumentApi = id =>
  apiHttp("DELETE", `${memberPath}/paymentInstrument/${id}`);

export const putDefaultPaymentInstrumentApi = id =>
  apiHttp("PUT", `${memberPath}/paymentInstrument/${id}/default`);
