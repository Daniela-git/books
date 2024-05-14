import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import sendNotification from './sendNotifications.js';

function sendNewLowestEmail() {
  const lowest = JSON.parse(readFileSync('./newLowest.json'));
  let text = '';
  for (const book of lowest) {
    text = `${text}\n${book.title}: $${book.price}`;
  }
  console.log({ text });
  sendNotification(text);
}
const filePath = join(process.cwd(), 'newLowest.json');
console.log({ filePath });
if (existsSync(filePath)) {
  console.log('send new lowest email');
  sendNewLowestEmail();
}
