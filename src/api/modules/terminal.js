import { apiHttp } from "../axiosApi.js";
import { v2terminalPath, terminalPath } from "../config/apiRoute.js";

export const getTerminalsApi = params =>
  apiHttp("GET", `${v2terminalPath}`, {}, { params });

export const postTerminalApi = body =>
  apiHttp("POST", `${v2terminalPath}`, body);

export const lockTerminalApi = body =>
  apiHttp("PUT", `${v2terminalPath}/lock`, body);

export const unlockTerminalApi = body =>
  apiHttp("PUT", `${v2terminalPath}/unlock`, body);

export const deleteTerminalApi = body =>
  apiHttp("DELETE", `${terminalPath}`, body);
