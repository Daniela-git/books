import { readFileSync } from 'fs';
import sendNotification from './sendNotifications.js';

function sendNewLowestEmail() {
  try {
    const lowest = JSON.parse(readFileSync('../newLowest.json'));
    let text = '';
    for (const book of lowest) {
      text = `${text}\n${book.title}: $${book.price}`;
    }
    console.log({ text });
    sendNotification(text, 'New Lowest');
  } catch (error) {
    console.log('no new lowest');
  }
}
sendNewLowestEmail();
