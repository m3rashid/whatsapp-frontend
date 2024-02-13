import { v4 as uuidv4 } from 'uuid';
import axios, { type AxiosRequestConfig } from 'axios';

import {
  SERVER_BASE_URL,
  AUTH_TOKEN_NAME,
  SERVICE_MAX_RETRIES,
  IDEMPOTENCY_KEY_HEADER,
} from './constants';

const axiosInstance = axios.create({ baseURL: SERVER_BASE_URL });

/**
 * @description Service function to call for APIs in a streamlined fashion
 * @example
 * ```ts
 * const loginService = Service("/auth/login")
 * await loginService({
 * 	data: { ... },
 * 	// ... other params to override
 * })
 * ```
 */
export function Service(
  endpoint: string,
  method = 'POST',
  maxRetries: number = SERVICE_MAX_RETRIES
) {
  return async function (config: AxiosRequestConfig = {}) {
    let retryCount = 0;
    const requestID = uuidv4();
    const token = localStorage.getItem(AUTH_TOKEN_NAME);

    while (retryCount < maxRetries) {
      try {
        const res = await axiosInstance(endpoint, {
          ...config,
          method,
          headers: {
            ...(config.headers || {}),
            [IDEMPOTENCY_KEY_HEADER]: requestID,
            Authorization: token ? `Bearer ${token}` : '',
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
          if (err.response?.status === 401 || err.response?.status === 403) {
            localStorage.removeItem(AUTH_TOKEN_NAME);
            return Promise.reject(err);
          }

          console.log('error: ', err);
          // return;
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

export const services = {
  init: Service('/api/auth/validate-login'),
  verifyOtp: Service('/api/auth/verify-otp'),
  checkPhoneNumber: Service('/api/auth/check-phone-number'),
};
