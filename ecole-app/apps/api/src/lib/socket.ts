import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { verifyAccessToken } from './jwt';
import { env } from '../config/env';
import { logger } from './logger';

export let io: Server;

export const initializeSocket = (httpServer: HttpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: [
        'http://localhost:5173',
        'http://localhost:3000',
        env.FRONT_URL,
        'https://digischool-iota.vercel.app'
      ],
      credentials: true,
    },
  });

  // Authentication Middleware
  io.use((socket: Socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication error: No token provided'));
    }

    try {
      const decoded = verifyAccessToken(token);
      if (!decoded || !decoded.id) {
        return next(new Error('Authentication error: Invalid token'));
      }
      
      // Store user ID in socket for later use
      socket.data.userId = decoded.id;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket: Socket) => {
    const userId = socket.data.userId;
    const userRoom = `user_${userId}`;
    
    // Join the user to their own personal room (for multi-device sync)
    socket.join(userRoom);
    logger.debug(`Socket ${socket.id} connected and joined room ${userRoom}`);

    socket.on('update_language', (data: { langue: string }) => {
      logger.info(`User ${userId} changed language to ${data.langue}`);
      // Broadcast to all other devices connected to this user's account
      socket.to(userRoom).emit('language_changed', { langue: data.langue });
    });

    socket.on('disconnect', () => {
      logger.debug(`Socket ${socket.id} disconnected`);
    });
  });

  return io;
};
