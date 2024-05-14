import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import sendNotification from './sendNotifications.js';

function sendNewLowestEmail() {
  try {
    const lowest = JSON.parse(readFileSync('../newLowest.json'));
    let text = '';
    for (const book of lowest) {
      text = `${text}\n${book.title}: $${book.price}`;
    }
    console.log({ text });
    sendNotification(text);
  } catch (error) {
    console.log('no new lowest');
  }
}
sendNewLowestEmail();
