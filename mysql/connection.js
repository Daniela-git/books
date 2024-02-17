import { createPool } from "mysql2/promise";
import "dotenv/config";

console.log(process.env.DB_USER);
export const pool = createPool({
  user: process.env.DB_USER,
  host: process.env.HOST,
  password: process.env.PASS,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});
