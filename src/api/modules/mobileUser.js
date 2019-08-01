import { apiHttp } from "../axiosApi.js";
import { mobileUserPath, userPath } from "../config/apiRoute.js";

export const createUserApi = body => apiHttp("POST", `${mobileUserPath}`, body);
export const loginApi = ({ email, password }) => {
  return apiHttp("GET", `${userPath}/details`, null, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(`${email}:${password}`)
    }
  });
};
