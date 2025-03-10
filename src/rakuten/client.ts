import axios from "axios";
import { config } from "../config";
import { logger } from "../utils/logger";

const BASE_URL = "https://app.rakuten.co.jp/services/api/Travel/";

export const client = axios.create({
  baseURL: BASE_URL,
  params: {
    applicationId: config.rakutenApiKey,
    format: "json",
  },
});

client.interceptors.request.use(
  (request) => {
    logger.debug(`[Rakuten API Request] ${request.method?.toUpperCase()} ${request.url}`);
    return request;
  },
  (error) => {
    logger.error("[Rakuten API Request Error]", error);
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    logger.debug(`[Rakuten API Response] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    logger.error("[Rakuten API Response Error]", error);
    return Promise.reject(error);
  }
);
