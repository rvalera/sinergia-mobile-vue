import { dashboardGraphPath } from "../config/apiRoute.js";
import { apiHttp } from "../axiosApi.js";
export const getDashboardGraph = (id, body) =>
  apiHttp("POST", `${dashboardGraphPath}/${id}`, body);
