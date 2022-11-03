import { Growdever } from "../models/growdever";
import db from "../db/index";

export class GrowdeverRepository {
  async getAllGrowdevers(): Promise<Growdever[]> {
    const data = await db.query("SELECT * FROM growdevers");

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
  }

  async createGrowdever(growdever: Growdever): Promise<void> {
    await db.query(
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
  }

  async getGrowdeverByUid(id: string): Promise<Growdever | undefined> {
    const data = await db.query("SELECT * FROM growdevers WHERE id = $1", [id]);

    if (data.rowCount === 0) return undefined;

    return Growdever.create(
      data.rows[0].id,
      data.rows[0].name,
      data.rows[0].cpf,
      data.rows[0].birth,
      data.rows[0].status,
      data.rows[0].skills ? (data.rows[0].skills as string).split(",") : []
    );
  }

  async updateGrowdever(growdever: Growdever): Promise<void> {
    await db.query(
      "UPDATE growdevers SET name = $1, birth = $2, status = $3, skills = $4 WHERE id = $5",
      [
        growdever.name,
        growdever.birth,
        growdever.status,
        growdever.skills.join(),
        growdever.id,
      ]
    );
  }

  async deleteGrowdever(id: string): Promise<boolean> {
    const data = await db.query("DELETE FROM growdevers WHERE id = $1", [id]);
    return data.rowCount !== 0;
  }
}
