import { Pool } from 'pg';

const {
    DB_HOST,
    DB_USER,
    DB_DATABASE,
    DB_PASSWORD,
    DB_PORT,
} = process.env;

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT,
});

console.log(`DB connected on port ${process.env.DB_PORT}`);


export default pool;