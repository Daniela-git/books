import { pool } from "./connection.js";
import {
  addPage,
  filterByBookAndPrice,
  lowestToFalse,
} from "../notion/queries.js";

async function readAll() {
  const [res] = await pool.query(`select * from prices`);
  for await (const price of res) {
    const page = await addPage(
      price.book_title,
      price.current_price,
      price.regular_price,
      price.percentage,
      price.date,
      false
    );
    console.log(page);
  }
  pool.end();
}
async function modifyLowest() {
  const [lowest] = await pool.query(`SELECT
  book_title,
  MIN(current_price) AS lowest
  FROM
  prices
  GROUP BY
  book_title`);
  pool.end();
  for await (const book of lowest) {
    const response = await filterByBookAndPrice(book.book_title, book.lowest);
    await lowestToFalse(response.id);
    console.log(response);
  }
}
