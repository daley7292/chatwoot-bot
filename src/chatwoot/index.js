import express from 'express';
import { handleChatwootMsg } from './handler';

const router = express.Router();

router.post('/chatwoot-webhook', async (req, res) => {
  try {
    await handleChatwootMsg(req.body);
    res.sendStatus(200);
  } catch (error) {
    console.error('Chatwoot webhook error:', error);
    res.sendStatus(500);
  }
});

export default router;