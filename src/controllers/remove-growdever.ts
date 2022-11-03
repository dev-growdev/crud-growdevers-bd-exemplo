import { Request, Response } from "express";
import { getGrowdeversSync, saveGrowdeversSync } from "../db/growdevers";
import { GrowdeverRepository } from "../repositories/growdever";

export class RemoveGrowdeverController {
  async remove(request: Request, response: Response) {
    const { id } = request.params;

    const repository = new GrowdeverRepository();

    const growdever = await repository.getGrowdeverByUid(id);

    if (!growdever) {
      return response.status(404).json({ error: "Growdever não encontrado" });
    }

    await repository.deleteGrowdever(id);

    return response.status(200).json();
  }
}
