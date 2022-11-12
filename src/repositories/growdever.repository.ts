import { Growdever } from "../models/growdever";
import { pgHelper } from "../database/pg-helper";

export class GrowdeverRepository {
  async getAllGrowdevers(): Promise<Growdever[]> {
    const result = await pgHelper.client.query("SELECT * FROM growdevers");

    return (result as Array<any>).map((row) =>
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
    await pgHelper.client.query(
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
    const result: Array<any> = await pgHelper.client.query(
      "SELECT * FROM growdevers WHERE id = $1",
      [id]
    );

    if (result.length === 0) return undefined;

    return Growdever.create(
      result[0].id,
      result[0].name,
      result[0].cpf,
      result[0].birth,
      result[0].status,
      result[0].skills ? (result[0].skills as string).split(",") : []
    );
  }

  async updateGrowdever(growdever: Growdever): Promise<void> {
    await pgHelper.client.query(
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
    const [result, rowCount]: Array<any> = await pgHelper.client.query(
      "DELETE FROM growdevers WHERE id = $1",
      [id]
    );
    console.log(result);
    console.log(rowCount);
    return rowCount !== 0;
  }
}
