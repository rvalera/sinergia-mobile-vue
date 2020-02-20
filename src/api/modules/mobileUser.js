import { apiHttp } from "../axiosApi.js";
import {
  appPersonPath,
  resetPassword,
  memberPath
} from "../config/apiRoute.js";

export const resetPasswordByType = (username, body) =>
  apiHttp("POST", `${resetPassword}/${username}`, body);

export const createAppPersonApi = (userId, body) =>
  apiHttp("POST", `${appPersonPath}/${userId}`, body);

//new endpoints

export const loginApi = ({ email: username, password }) => {
  return apiHttp("POST", `${memberPath}/login`, { username, password });
};

export const refreshTokenApi = refresh_token =>
  apiHttp(
    "POST",
    `${memberPath}/token/refresh`,
    {},
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${refresh_token}`
      }
    }
  );

export const getMemberProfileApi = () =>
  apiHttp("GET", `${memberPath}/profile`);

export const createUserApi = body =>
  apiHttp("POST", `${memberPath}/signup`, body);

export const forgotPasswordUserApi = body =>
  apiHttp("POST", `${memberPath}/password/reset`, body);

export const forgotOpeKeyUserApi = () =>
  apiHttp("POST", `${memberPath}/operationKey/reset`);

export const updateUserApi = body =>
  apiHttp("PUT", `${memberPath}/profile`, body);

export const changePassApi = body =>
  apiHttp("PUT", `${memberPath}/password`, body);

export const changeOpeKeyApi = body =>
  apiHttp("PUT", `${memberPath}/operationKey`, body);

export const getAppPersonApi = email =>
  apiHttp("GET", `${memberPath}/profile/${email}`);
