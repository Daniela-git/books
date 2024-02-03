import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { pool } from '../mysql/connection.js';

const app = express();
const port = process.env.SERVER_PORT || 3000;
app.use(cors());
app.use(bodyParser.json());

// work in progress
// app.get('/', async (req, res) => {
//   const getLatestPrices = `WITH RankedData AS (
//     SELECT
//       *,
//       ROW_NUMBER() OVER (PARTITION BY book_title ORDER BY date DESC) AS rn
//     FROM
//       prices
//   )
//   SELECT
//     *
//   FROM
//     RankedData
//   WHERE
//     rn = 1;
//   `;
//   const [prices] = await pool.query(getLatestPrices);
//   const lowestPriceQuery = `SELECT book_title, MIN(current_price) as lowest FROM prices GROUP BY book_title`;
//   const [lowest] = await pool.query(lowestPriceQuery);
//   res.send({ prices, lowest });
// });
app.get('/books', async (req, res) => {
  try {
    const getAllBooks = `SELECT title, lowest FROM books`;
    const [books] = await pool.query(getAllBooks);
    const respond = [];
    for await (const book of books) {
      const getLastPrice = `SELECT current_price,date FROM prices
  WHERE book_title = "{title}" ORDER BY date ASC;
  `;
      const [pricesList] = await pool.query(
        getLastPrice.replace('{title}', book.title)
      );
      respond.push({
        title: book.title,
        pricesList: pricesList.pop(),
        lowest: book.lowest,
      });
    }
    res.send(respond);
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).send('Error en el servidor');
  }
});

app.post('/book', async (req, res) => {
  const title = req.body.bookName;
  console.log(title);
  const getPrices = `SELECT current_price,date, regular_price, percentage FROM prices
  WHERE book_title = "{title}" ORDER BY date DESC;
  `;
  const [prices] = await pool.query(getPrices.replace('{title}', title));
  res.send(prices);
});
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
