import { apiHttp } from "../axiosApi.js";
import { terminalPath } from "../config/apiRoute.js";

export const getTerminalsApi = params =>
  apiHttp("GET", `${terminalPath}`, {}, { params });

export const postTerminalApi = body => apiHttp("POST", `${terminalPath}`, body);

export const lockTerminalApi = body =>
  apiHttp("PUT", `${terminalPath}/lock`, body);

export const unlockTerminalApi = body =>
  apiHttp("PUT", `${terminalPath}/unlock`, body);

export const deleteTerminalApi = id =>
  apiHttp("DELETE", `${terminalPath}/${id}`);
