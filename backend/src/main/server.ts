import { createServer } from 'http';
import { Server } from 'socket.io';
import { app } from './config/app';
import { env } from './config/env';

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

export { io };

httpServer.listen(env.PORT, () => {
  console.log(`Server running in development mode at http://localhost:${env.PORT}`);
});
