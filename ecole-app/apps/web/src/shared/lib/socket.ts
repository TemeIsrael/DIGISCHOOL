import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '../../features/auth/store';
import i18n from './i18n';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4001';

export let socket: Socket | null = null;

export const connectSocket = () => {
  const token = useAuthStore.getState().accessToken;
  if (!token) return;

  if (!socket) {
    socket = io(API_URL, {
      auth: { token },
      withCredentials: true,
      transports: ['websocket', 'polling']
    });

    socket.on('connect', () => {
      console.log('Socket connected:', socket?.id);
    });

    socket.on('language_changed', (data: { langue: string }) => {
      console.log('Language sync received:', data.langue);
      // Ensure we only change if it's actually different to avoid infinite loops
      if (i18n.language !== data.langue) {
        i18n.changeLanguage(data.langue);
      }
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const emitLanguageChange = (langue: string) => {
  if (socket && socket.connected) {
    socket.emit('update_language', { langue });
  }
};
