import io from 'socket.io-client';

import { AUTH_TOKEN_NAME, SERVER_BASE_URL } from './constants';

/**
 * @description Socket instance to connect to the server via websockets
 */
export const socket = io(SERVER_BASE_URL, {
  transports: ['websocket'],
  // autoConnect: false,
  auth: {
    token: localStorage.getItem(AUTH_TOKEN_NAME),
  },
});
