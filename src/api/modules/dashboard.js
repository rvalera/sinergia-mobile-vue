import { memberPath } from "../config/apiRoute.js";
import { apiHttp } from "../axiosApi.js";
export const getDashboardGraph = params =>
  apiHttp("GET", `${memberPath}/dashboard`, {}, { params });
