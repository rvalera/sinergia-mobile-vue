import { apiHttp } from "../axiosApi.js";
import { applicationPath } from "../config/apiRoute.js";

export const getCoinApi = () => apiHttp("GET", `${applicationPath}/coin`);
