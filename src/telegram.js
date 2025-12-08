// src/telegram.js
import fetch from "node-fetch";
import "dotenv/config";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
  console.warn(
    "⚠️ TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID missing in .env. Telegram sending will fail."
  );
}

/**
 * Send a text message to the configured Telegram chat
 */
export async function sendToTelegram(text) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    throw new Error("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID missing in .env");
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text,
      parse_mode: "Markdown"
    })
  });

  const data = await res.json();

  if (!data.ok) {
    console.error("Telegram error:", data);
    throw new Error("Failed to send message to Telegram");
  }

  return data;
}
