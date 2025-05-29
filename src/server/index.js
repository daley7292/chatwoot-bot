import express from 'express';
import botRouter from '../bot/index.js';
import chatwootRouter from '../chatwoot/index.js';
// import { initDb } from '../db/sqlite.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT=process.env.PORT || 3e4;

async function start() {
  // await initDb();

  const app = express();
  app.use(express.json());

  app.use('/', botRouter);
  app.use('/', chatwootRouter);

  app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).send('Internal Server Error');
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();
