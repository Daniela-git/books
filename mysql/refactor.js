import { readFileSync, writeFileSync } from "fs";
import { pool } from "./connection.js";

async function eliminateDuplicate() {
  const todaysData = JSON.parse(readFileSync("./results.json"));
  const res = {};
  const keys = Object.keys(todaysData);
  keys.forEach((book) => {
    console.log(book);
    let lastPrice = 0;
    const priceRes = [];
    todaysData[book].prices.forEach((price) => {
      if (price.currentPrice !== lastPrice) {
        // price.date = new Date(price.date).toISOString();
        priceRes.push(price);
      }
      lastPrice = price.currentPrice;
    });
    res[book] = { prices: priceRes, lowest: todaysData[book].lowestPrice };
  });

  writeFileSync("resultFormat.json", JSON.stringify(res));
}

function formatInsertPrice(rest, title) {
  let insertNewPrice = `INSERT INTO prices (book_title, regular_price, current_price, percentage, date) VALUES ("{title}", {regular_price}, {current_price}, {percentaje}, "{date}");`;
  insertNewPrice = insertNewPrice.replace("{title}", title);
  insertNewPrice = insertNewPrice.replace("{regular_price}", rest.regularPrice);
  insertNewPrice = insertNewPrice.replace("{current_price}", rest.currentPrice);
  insertNewPrice = insertNewPrice.replace("{percentaje}", rest.percentage);
  insertNewPrice = insertNewPrice.replace("{date}", rest.date);
  return insertNewPrice;
}

async function addAllToDB() {
  const inserNewBook = `INSERT INTO books (title,lowest) VALUES ("{title}", {lowest});`;
  const todaysData = JSON.parse(readFileSync("./resultFormat.json"));
  const keys = Object.keys(todaysData);
  console.log(keys);
  for await (const book of keys) {
    console.log(book);
    const data = todaysData[book];
    await pool.query(
      inserNewBook.replace('"{title}", {lowest}', `"${book}", ${data.lowest}`)
    );
    for await (const price of data.prices) {
      console.log(price);
      await pool.query(formatInsertPrice(price, book));
    }
  }
}

// eliminateDuplicate();
addAllToDB().then(() => pool.end());
