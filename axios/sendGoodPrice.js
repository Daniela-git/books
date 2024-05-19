import { readFileSync } from 'fs';
import updateTelegram from './telegramUpdates.js';

function sendGoodPricesNotification() {
  try {
    const goodPrice = JSON.parse(readFileSync('./goodPrice.json'));
    let text = 'GOOD PRICE(S)/n';
    for (const book of goodPrice) {
      const price = Number(book.price);
      text = `${text}\n${book.title}: $${price.toLocaleString()}`;
    }
    updateTelegram(text);
  } catch (error) {
    console.log(error);
    console.log('no good prices');
  }
}
sendGoodPricesNotification();
