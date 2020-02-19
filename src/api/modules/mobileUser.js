import { apiHttp } from "../axiosApi.js";
import {
  mobileUserPath,
  userPath,
  appPersonPath,
  appPersonData,
  appCardsData,
  resetPassword,
  resetUserPassword,
  changeOperatioKey,
  changePassword,
  memberPath
} from "../config/apiRoute.js";

export const createUserApi = body => apiHttp("POST", `${mobileUserPath}`, body);

export const resetPasswordByType = (username, body) =>
  apiHttp("POST", `${resetPassword}/${username}`, body);

export const resetPasswordUser = (username, body) =>
  apiHttp("POST", `${resetUserPassword}/${username}`, body);

export const changeOpeKey = (person_id, body) =>
  apiHttp("PUT", `${changeOperatioKey}/${person_id}`, body);

export const changePass = (person_id, body) =>
  apiHttp("PUT", `${changePassword}/${person_id}`, body);

export const becomeAffiliateApi = person_id =>
  apiHttp("PUT", `${appCardsData}/request/${person_id}`);

export const createAppPersonApi = (userId, body) =>
  apiHttp("POST", `${appPersonPath}/${userId}`, body);

export const updateUserApi = (userId, body) =>
  apiHttp("PUT", `${mobileUserPath}/${userId}`, body);

export const changePassUserApi = (userId, password) =>
  apiHttp("PUT", `${userPath}/password/${userId}`, { password });

export const getAppPersonApi = userName =>
  apiHttp("GET", `${appPersonData}/${userName}/A`);

export const loginApi = ({ email: username, password }) => {
  return apiHttp("POST", `${memberPath}/login`, { username, password });
};

export const getMemberProfile = () => apiHttp("GET", `${memberPath}/profile`);
