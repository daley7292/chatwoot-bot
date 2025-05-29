import express from 'express';
import { handleTgMsg } from './handler';

const router = express.Router();

router.post('/telegram-webhook', async (req, res) => {
  try {
    await handleTgMsg(req.body);
    res.sendStatus(200);
  } catch (error) {
    console.error('Telegram webhook error:', error);
    res.sendStatus(500);
  }
});

export default router;
