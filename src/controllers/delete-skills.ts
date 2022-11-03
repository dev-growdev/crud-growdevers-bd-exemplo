import { Request, Response } from "express";
import { getGrowdeversSync, saveGrowdeversSync } from "../db/growdevers";
import { GrowdeverRepository } from "../repositories/growdever";

export class DeleteSkillController {
  async deleteSkill(request: Request, response: Response) {
    const { id } = request.params;
    const { skill } = request.body;

    const repository = new GrowdeverRepository();

    const growdever = await repository.getGrowdeverByUid(id);

    if (!growdever) {
      return response.status(404).json({ error: "Growdever não encontrado" });
    }

    try {
      growdever.deleteSkill(skill);
      repository.updateGrowdever(growdever);
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }

    return response.status(200).json({ skills: growdever.skills });
  }
}
