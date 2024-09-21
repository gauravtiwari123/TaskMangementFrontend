import { io } from 'socket.io-client';
const URL = process.env.NODE_URL || 'http://localhost:8080';
export const socket = io(URL);