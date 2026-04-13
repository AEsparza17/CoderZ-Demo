import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'https://backend.coder-z.com';
const SOCKET_PATH = import.meta.env.VITE_SOCKET_PATH || '/portal/socket.io';

let _socket = null;

const getSocket = () => {
  if (!_socket) {
    const token = localStorage.getItem('coderz_token');
    _socket = io(SOCKET_URL, {
      path: SOCKET_PATH,
      transports: ['websocket', 'polling'],
      auth: { token },
    });
  }
  return _socket;
};

export const disconnectSocket = () => {
  if (_socket) {
    _socket.disconnect();
    _socket = null;
  }
};

export const useSocket = (handlers) => {
  const handlersRef = useRef(handlers);
  handlersRef.current = handlers;

  useEffect(() => {
    const socket = getSocket();
    const wrapped = {};
    for (const event of Object.keys(handlersRef.current)) {
      wrapped[event] = (...args) => handlersRef.current[event](...args);
      socket.on(event, wrapped[event]);
    }
    return () => {
      for (const [event, fn] of Object.entries(wrapped)) {
        socket.off(event, fn);
      }
    };
  }, []);
};
