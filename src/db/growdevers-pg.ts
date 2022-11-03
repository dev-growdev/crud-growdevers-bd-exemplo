import { Pool } from "pg";
import { Growdever } from "../models/growdever";

const pool = new Pool({
  connectionString:
    "postgres://growdev:growdev2022@postgres-starter:5432/starter",
});

export const getGrowdevers = async (): Promise<Growdever[]> => {
  const data = await pool.query("SELECT * FROM growdevers");

  return data.rows.map((row) =>
    Growdever.create(
      row.id,
      row.name,
      row.cpf,
      row.birth,
      row.status,
      row.skills ? (row.skills as string).split(",") : []
    )
  );
};

export const addGrowdever = async (growdever: Growdever) => {
  await pool.query(
    "INSERT INTO growdevers(id, name, birth, cpf, status, skills) VALUES ($1, $2, $3, $4, $5, $6)",
    [
      growdever.id,
      growdever.name,
      growdever.birth,
      growdever.cpf,
      growdever.status,
      growdever.skills.join(),
    ]
  );
};

// (async () => {
//   //   await addGrowdever(new Growdever("Edson", "1997-10-31", "11122233344"));
//   const result = await getGrowdevers();
//   console.log(result);
// })();
