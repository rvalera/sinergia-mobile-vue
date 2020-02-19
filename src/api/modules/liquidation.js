import { apiHttp } from "../axiosApi.js";
import { affiliatePath } from "../config/apiRoute.js";

export const getLiquidationsApi = params =>
  apiHttp("GET", `${affiliatePath}/withdrawal`, {}, { params });
