import { v4 as uuidV4 } from 'uuid';
import { io } from 'socket.io-client';

import {
  AUTH_TOKEN_NAME,
  IDEMPOTENCY_KEY_HEADER,
  SERVER_BASE_URL,
} from './constants';

/**
 * @description Socket instance to connect to the server via websockets
 */
export const socket = io(SERVER_BASE_URL, {
  transports: ['websocket'],
  withCredentials: true,
  autoConnect: false,
  auth: {
    token: localStorage.getItem(AUTH_TOKEN_NAME),
  },
  extraHeaders: {
    [IDEMPOTENCY_KEY_HEADER]: uuidV4(),
  },
});
