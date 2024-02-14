import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { pool } from '../mysql/connection.js';

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());

app.get('/books', async (req, res) => {
  try {
    const query = `SELECT 
    lowest_prices.book_title,
    lowest_prices.lowest,
    latest_prices.current_price AS latest_price
    FROM
        (
            SELECT
                book_title,
                MIN(current_price) AS lowest
            FROM
                prices
            GROUP BY
                book_title
        ) AS lowest_prices
    INNER JOIN
        (
            SELECT
                p.book_title,
                p.current_price,
                MAX(p.date) AS latest_date
            FROM
                prices p
            INNER JOIN
                (
                    SELECT
                        book_title,
                        MAX(date) AS latest_date
                    FROM
                        prices
                    GROUP BY
                        book_title
                ) latest_prices ON p.book_title = latest_prices.book_title
                                AND p.date = latest_prices.latest_date
            GROUP BY
                p.book_title,
                p.current_price
        ) AS latest_prices ON lowest_prices.book_title = latest_prices.book_title;
    `;
    const [books] = await pool.query(query);
    console.log(books);
    res.send(books);
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
