import { apiHttp } from "../axiosApi.js";
import { applicationPath } from "../config/apiRoute.js";

export const getAppToken = () => apiHttp("GET", `${applicationPath}/`);
