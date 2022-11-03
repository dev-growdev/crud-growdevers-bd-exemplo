import { Request, Response } from "express";
import { getGrowdeversSync, saveGrowdeversSync } from "../db/growdevers";
import { GrowdeverRepository } from "../repositories/growdever";

export class AddGrowdeverSkillsController {
  async addSkills(request: Request, response: Response) {
    const { id } = request.params;
    const { skills } = request.body;

    const repository = new GrowdeverRepository();

    const growdever = await repository.getGrowdeverByUid(id);

    if (!growdever) {
      return response.status(404).json({ error: "Growdever não encontrado" });
    }

    try {
      growdever.updateSkills(skills);
      repository.updateGrowdever(growdever);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }

    return response.json(growdever.skills);
  }
}
