import { apiHttp } from "../axiosApi.js";
import { entitiesPath } from "../config/apiRoute.js";

////////////////////////////////////////////////////////////////////////////

export const getMemberBalanceApi = email =>
  apiHttp("GET", `${entitiesPath}/balance/${email}`);

export const putRefillMemberBalanceApi = body =>
  apiHttp("PUT", `${entitiesPath}/balance/refill`, body);

////////////////////////////////////////////////////////////////////////////

export const getAllContentApi = params =>
  apiHttp("GET", `${entitiesPath}/content`, {}, { params });

export const getAllSiteApi = () => apiHttp("GET", `${entitiesPath}/site`, {});

export const getMemberContentApi = email =>
  apiHttp("GET", `${entitiesPath}/content/user/${email}`);

export const getSiteContentApi = site_id =>
  apiHttp("GET", `${entitiesPath}/content/site/${site_id}`);

export const getAllContentTypeApi = () =>
  apiHttp("GET", `${entitiesPath}/content_type`, {});

export const postContentApi = body =>
  apiHttp("POST", `${entitiesPath}/content/create`, body);

export const postContentTypeApi = body =>
  apiHttp("POST", `${entitiesPath}/content_type`, body);

export const postSiteApi = body =>
  apiHttp("POST", `${entitiesPath}/site`, body);

export const putFollowSiteApi = body =>
  apiHttp("PUT", `${entitiesPath}/site/follow`, body);

export const putLoveSiteApi = body =>
  apiHttp("PUT", `${entitiesPath}/site/love`, body);
