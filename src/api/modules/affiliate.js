import { apiHttp } from "../axiosApi.js";
import { affiliatePath } from "../config/apiRoute.js";

export const becomeAffiliateApi = () =>
  apiHttp("POST", `${affiliatePath}/signup`);
