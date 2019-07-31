import { apiHttp } from "../axiosApi.js";
import { mobileUserPath } from "../config/apiRoute.js";

export const createUserApi = body => apiHttp("POST", `${mobileUserPath}`, body);
