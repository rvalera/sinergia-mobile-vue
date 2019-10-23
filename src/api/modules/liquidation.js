import { apiHttp } from "../axiosApi.js";
import { personliquidationPath } from "../config/apiRoute.js";

export const getLiquidationsApi = params =>
  apiHttp("GET", `${personliquidationPath}`, {}, { params });
