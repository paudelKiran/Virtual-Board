import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL ='http://localhost:9000';

export const socket = io(URL,{
  timeout: 10000,
  reconnectionAttempts:5,
  transports: ["websocket"],
});