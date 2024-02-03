import { readFileSync } from "fs";
import { pool } from "./connection.js";

function formatInsertPrice(rest, title) {
  let insertNewPrice = `INSERT INTO prices (book_title, regular_price, current_price, percentage) VALUES ("{title}", {regular_price}, {current_price}, {percentaje});`;
  insertNewPrice = insertNewPrice.replace("{title}", title);
  insertNewPrice = insertNewPrice.replace("{regular_price}", rest.regularPrice);
  insertNewPrice = insertNewPrice.replace("{current_price}", rest.currentPrice);
  insertNewPrice = insertNewPrice.replace("{percentaje}", rest.percentage);
  return insertNewPrice;
}

const writeData = async () => {
  const todaysData = JSON.parse(readFileSync("./todaysData.json"));
  const getAllBooks = `SELECT title FROM books`;
  const inserNewBook = `INSERT INTO books (title,lowest) VALUES ("{title}", {lowest});`;
  const deleteBook = `DELETE FROM books WHERE title="{title}";`;
  const deletePrices = `DELETE FROM prices WHERE book_title="{title}";`;
  const lowestPricePerBook = `SELECT lowest FROM books WHERE title="{title}"`;
  const updateLowestPrice = `
  UPDATE books
  SET lowest = {lowest}
  WHERE title = "{title}";
  `;
  // select current_price, date from prices where book_title = "{title}" order by date asc
  const getLastPrice = `SELECT current_price,date FROM prices
  WHERE book_title = "{title}" ORDER BY date ASC;
  `;
  const result = await pool.query(getAllBooks);
  const titles = result[0].map((book) => book.title);
  console.log(titles);
  const copyTitles = Array.from(titles);
  const keys = Object.keys(todaysData);
  for await (const key of keys) {
    const index = titles.indexOf(key);
    const data = todaysData[key];
    if (index !== -1) {
      const [lastPrice] = await pool.query(
        getLastPrice.replace("{title}", key)
      );
      console.log(lastPrice);
      copyTitles.splice(index, 1);
      // we are only gonna store the price if it changes
      if (lastPrice.pop().current_price !== data.currentPrice) {
        await pool.query(formatInsertPrice(data, key));
        const [lowest] = await pool.query(
          lowestPricePerBook.replace("{title}", key)
        );

        if (data.currentPrice < lowest[0].lowest) {
          await pool.query(
            updateLowestPrice.replace("{lowest}", data.currentPrice)
          );
        }
      }
    } else {
      await pool.query(
        inserNewBook.replace(
          '"{title}", {lowest}',
          `"${key}", ${data.currentPrice}`
        )
      );
      await pool.query(formatInsertPrice(data, key));
    }
  }
  if (copyTitles.length !== 0) {
    for await (const title of copyTitles) {
      // delete all the elements inside
      console.log(`delete ${title}`);
      await pool.query(deletePrices.replace("{title}", title));
      await pool.query(deleteBook.replace("{title}", title));
    }
  }
  pool.end();
};

writeData();
