import { readFileSync } from 'fs';
import updateTelegram from './telegramUpdates.js';

function sendNewLowestEmail() {
  try {
    const lowest = JSON.parse(readFileSync('./newLowest.json'));
    let text = 'NEW LOWEST/n';
    for (const book of lowest) {
      const price = Number(book.price);
      text = `${text}\n${book.title}: $${price.toLocaleString()}`;
    }
    updateTelegram(text);
  } catch (error) {
    console.log(error);
    console.log('no new lowest');
  }
}
sendNewLowestEmail();
