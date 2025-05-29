import { saveMessage } from '../db/sqlite.js';
import { sendMessage } from '../services/telegramService.js';
import { TopicMap } from './topicMap.js';

const topicMap = new TopicMap();

export async function handleTgMsg(update) {
  const message = update.message || update.edited_message;
  if (!message) return;

  const chatId = String(message.chat.id);
  const userId = String(message.from.id);
  const text = message.text || '';

  // 保存用户消息到数据库
  await saveMessage({
    chatId,
    userId,
    role: 'user',
    content: text,
    timestamp: message.date * 1000,
  });

  if (text.startsWith('/start')) {
    const welcomeText = '欢迎使用客服机器人！请输入您的问题。';
    await sendMessage(chatId, welcomeText);

    // 保存机器人回复消息
    await saveMessage({
      chatId,
      userId: 'bot',
      role: 'bot',
      content: welcomeText,
      timestamp: Date.now(),
    });
  } else {
    // 简单回复示例，后续可以调用聊天逻辑
    const reply = `您说的是：${text}`;
    await sendMessage(chatId, reply);

    // 保存机器人回复消息
    await saveMessage({
      chatId,
      userId: 'bot',
      role: 'bot',
      content: reply,
      timestamp: Date.now(),
    });
  }

  // 这里可以使用 topicMap 管理对话状态
}
