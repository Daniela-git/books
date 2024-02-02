import { createPool } from 'mysql2/promise';
import 'dotenv/config';

console.log(process.env.DB_USER);
export const pool = createPool({
  user: process.env.DB_USER,
  host: process.env.HOST,
  password: process.env.PASS,
  database: process.env.DATABASE,
  port: process.env.PORT,
});

// pool.query(`CREATE TABLE books (
//   title VARCHAR(255) PRIMARY KEY,
//   lowest INT
// );`);

// pool.query(`CREATE TABLE prices (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   book_title VARCHAR(255),
//   regular_price INT,
//   current_price INT,
//   percentage INT,
//   date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   FOREIGN KEY (book_title) REFERENCES books(title)
// );`);

// pool.query(`DROP TABLE prices;`).then(() => pool.query(`DROP TABLE books;`));

// pool.query(`SELECT title FROM books`).then((value) => console.log(value[0]));

// pool.query(`DROP TABLE books;`);
// pool
//   .query(
//     `SELECT book_title, MIN(current_price) as lowest FROM prices WHERE book_title="From Hell"`
//   )
//   .then((res) => console.log(res));
// pool
//   .query(
//     `DELETE FROM books;
// `
//   )
//   .then(() => pool.end());
// pool
//   .query(
//     `SELECT current_price FROM prices
// WHERE DATE(date) = DATE_SUB(CURDATE(), INTERVAL 1 DAY) AND book_title = "Abara Master Edition";
// `
//   )
//   .then((res) => {
//     console.log(res[0][0]);
//     pool.end();
//   });

// pool
//   .query(
//     `SELECT current_price,date FROM prices
// WHERE book_title = "From Hell" ORDER BY date ASC;`
//   )
//   .then((res) => {
//     console.log(res[0].pop());
//     pool.end();
//   });
