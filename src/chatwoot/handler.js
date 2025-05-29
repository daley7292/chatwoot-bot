import { sendMessage } from '../services/telegramService.js';

export async function handleChatwootMsg(payload) {
  const message = payload.message;
  const sender = payload.sender;

  const chatId = String(sender.external_id || sender.id || 'unknown');

  if (!message || !message.content) return;
  await sendMessage(chatId, `客服消息: ${message.content}`);
}
