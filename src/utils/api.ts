import { v4 as uuidv4 } from 'uuid';
import axios, { type AxiosRequestConfig } from 'axios';

import {
  CLIENT_TOKEN_KEY,
  SERVICE_MAX_RETRIES,
  IDEMPOTENCY_KEY_HEADER,
} from './constants';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
});

/**
 * @description Service function to call for APIs in a streamlined fashion
 * @example
 * ```ts
 * const loginService = Service("/auth/login")
 * await loginService({
 * 	body: { ... },
 * 	// ... other params to override
 * })
 * ```
 */
export function Service(
  endpoint: string,
  maxRetries: number = SERVICE_MAX_RETRIES
) {
  return async function (config: AxiosRequestConfig = {}) {
    let retryCount = 0;
    const requestID = uuidv4();

    while (retryCount < maxRetries) {
      try {
        const res = await axiosInstance(endpoint, {
          ...config,
          headers: {
            ...(config.headers || {}),
            [IDEMPOTENCY_KEY_HEADER]: requestID,
            Authorization: `Bearer ${localStorage.getItem(CLIENT_TOKEN_KEY)}`,
          },
        });
        return res;
      } catch (err: any) {
        retryCount += 1;

        if (
          err.response &&
          err.response?.status >= 400 &&
          err.response?.status < 500
        ) {
          if (err.response?.status === 401) {
            localStorage.removeItem(CLIENT_TOKEN_KEY);
            return Promise.reject(err);
          }

          console.log('error: ', err);
          return;
        }

        if (retryCount >= maxRetries) {
          console.error('Max retries reached, could not complete request');
          return Promise.reject(err);
        } else {
          await new Promise((resolve) =>
            setTimeout(resolve, Math.pow(2, retryCount) * 1000)
          );
        }
      }
    }
  };
}
