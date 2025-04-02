// payload-backend/server.ts
import express from 'express';
import payload from 'payload';
import socketServer from './socket-server';
import matchRoutes from './routes/match';
import exportRoutes from './routes/export';
import chatRoute from './routes/admin-chat';
import conflictRoute from './routes/conflict';
import cronExpiredDocs from './plugins/cronExpiredDocs';
import socketPlugin from './plugins/socketPlugin';
import redisClient from './utils/redis';

require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api/match', matchRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/admin-chat', chatRoute);
app.use('/api/conflict', conflictRoute);

const start = async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.warn('Redis unavailable, continuing without cache.');
  }

  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
      console.log('Payload CMS initialized');
      cronExpiredDocs();
      socketServer();
    },
    plugins: [socketPlugin],
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();