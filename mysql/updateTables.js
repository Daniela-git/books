import { readFileSync } from 'fs';
import { pool } from './connection.js';

function formatInsertPrice(rest, title) {
  let insertNewPrice = `INSERT INTO prices (book_title, regular_price, current_price, percentage) VALUES ("{title}", {regular_price}, {current_price}, {percentaje});`;
  insertNewPrice = insertNewPrice.replace('{title}', title);
  insertNewPrice = insertNewPrice.replace('{regular_price}', rest.regularPrice);
  insertNewPrice = insertNewPrice.replace('{current_price}', rest.currentPrice);
  insertNewPrice = insertNewPrice.replace('{percentaje}', rest.percentage);
  return insertNewPrice;
}

const writeData = async () => {
  const todaysData = JSON.parse(readFileSync('./todaysData.json'));
  const getAllBooks = `SELECT title FROM books`;
  const insertNewBook = `INSERT INTO books (title) VALUES ("{title}");`;
  const deleteBook = `DELETE FROM books WHERE title="{title}";`;
  const deletePrices = `DELETE FROM prices WHERE book_title="{title}";`;
  const getLastPrice = `SELECT current_price,date FROM prices
  WHERE book_title = "{title}" ORDER BY date DESC LIMIT 1;
  `;
  const result = await pool.query(getAllBooks);
  const titles = result[0].map((book) => book.title);
  console.log(titles);
  const keys = Object.keys(todaysData);
  console.log(keys);

  // updates titles on the DB and add new books
  for await (const title of keys) {
    const index = titles.indexOf(title);
    const data = todaysData[title];
    console.log({ title: title, index });
    if (index !== -1) {
      console.log('update book');
      const [lastPrice] = await pool.query(
        getLastPrice.replace('{title}', title)
      );
      // we are only gonna store the price if it changes
      if (lastPrice[0].current_price !== data.currentPrice) {
        console.log(
          `price change: old ${lastPrice[0].current_price} - new ${data.currentPrice}`
        );
        await pool.query(formatInsertPrice(data, title));
      }
    } else {
      console.log(`new book ${title}`);
      await pool.query(insertNewBook.replace('{title}', title));
      await pool.query(formatInsertPrice(data, title));
    }
  }
  // delete all prices and book from tables
  for await (const title of titles) {
    const inTodays = keys.includes(title);
    if (!inTodays) {
      console.log(`delete ${title}`);
      await pool.query(deletePrices.replace('{title}', title));
      await pool.query(deleteBook.replace('{title}', title));
    }
  }
  pool.end();
};

writeData();
