import { Pool } from "pg";

const pool = new Pool({
  connectionString:
    "postgres://growdev:growdev2022@postgres-starter:5432/starter",
});

export default {
  query: (sql: string, params?: any[]) => pool.query(sql, params),
};
