import { apiHttp } from "../axiosApi.js";
import { affiliatePath } from "../config/apiRoute.js";

export const getTerminalsApi = params =>
  apiHttp("GET", `${affiliatePath}/terminal`, {}, { params });

export const postTerminalApi = body =>
  apiHttp("POST", `${affiliatePath}/terminal`, body);

export const lockTerminalApi = id =>
  apiHttp("PUT", `${affiliatePath}/terminal/${id}/lock`);

export const unlockTerminalApi = id =>
  apiHttp("PUT", `${affiliatePath}/terminal/${id}/unlock`);

export const deleteTerminalApi = id =>
  apiHttp("DELETE", `${affiliatePath}/terminal/${id}`);
