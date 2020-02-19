import { apiHttp } from "../axiosApi.js";
import {
  appPersonPath,
  appPersonData,
  resetPassword,
  memberPath
} from "../config/apiRoute.js";

export const resetPasswordByType = (username, body) =>
  apiHttp("POST", `${resetPassword}/${username}`, body);

export const createAppPersonApi = (userId, body) =>
  apiHttp("POST", `${appPersonPath}/${userId}`, body);

export const getAppPersonApi = userName =>
  apiHttp("GET", `${appPersonData}/${userName}/A`);

//new endpoints

export const loginApi = ({ email: username, password }) => {
  return apiHttp("POST", `${memberPath}/login`, { username, password });
};

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
