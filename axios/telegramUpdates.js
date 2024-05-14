import axios from 'axios';
import 'dotenv/config';

const options = (text) => {
  return {
    method: 'POST',
    url: `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    headers: {
      'content-type': 'application/json',
    },

    data: {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text,
    },
  };
};

export default async function updateTelegram(text) {
  try {
    const response = await axios.request(options(text));
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
