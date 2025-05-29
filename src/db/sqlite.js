import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

const dbPath = path.resolve('database/app.db');

export async function getDb() {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  // 可以写表结构初始化
  await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chat_id TEXT,
      user_id TEXT,
      role TEXT,
      content TEXT,
      timestamp INTEGER
    );
  `);

  return db;
}
