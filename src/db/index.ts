import { Pool } from "pg";

const pool = new Pool({
  connectionString:
    "postgres://growdev:growdev2022@postgres-starter:5432/starter",
});

export default {
  query: async (sql: string, params?: any[]) => {
    const client = await pool.connect();
    const result = await pool.query(sql, params);
    client.release();
    return result;
  },
};
