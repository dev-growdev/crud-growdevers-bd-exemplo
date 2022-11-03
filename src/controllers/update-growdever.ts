import { Request, Response } from "express";
import { getGrowdevers, saveGrowdevers } from "../db/growdevers";
import { GrowdeverRepository } from "../repositories/growdever";

export class UpdateGrowdeverController {
  async update(request: Request, response: Response) {
    const { id } = request.params;

    const { name, birth, status } = request.body;

    const repository = new GrowdeverRepository();

    const growdever = await repository.getGrowdeverByUid(id);

    if (!growdever) {
      return response.status(404).json({ error: "Growdever não encontrado" });
    }

    try {
      growdever.updateInformation(name, new Date(birth), status);
      await repository.updateGrowdever(growdever);
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }

    return response.json(growdever.toJson());
  }
}
