import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString,
});

console.log(`DB connected on port 5432`);

export const db = {
  query: (text: string, params: any) => pool.query(text, params),
};


export default pool;