import { Request, Response } from "express";
import { Growdever } from "../models/growdever";
import { addGrowdever } from "../db/growdevers-pg";
import { GrowdeverRepository } from "../repositories/growdever";

export class CreateGrowdeverController {
  // === SEM UTILIZAR O REPOSITORIO ===
  // async create(request: Request, response: Response) {
  //   const { name, cpf, birth, skills } = request.body;

  //   if (skills && !(skills instanceof Array)) {
  //     return response.status(400).json({ error: "Skills no formado inválido" });
  //   }

  //   const growdever = new Growdever(name, new Date(birth), cpf, skills);

  //   await addGrowdever(growdever);

  //   return response.json(growdever.toJson());
  // }

  // === UTILIZANDO O REPOSITORIO ===
  async create(request: Request, response: Response) {
    const { name, cpf, birth, skills } = request.body;

    if (skills && !(skills instanceof Array)) {
      return response.status(400).json({ error: "Skills no formado inválido" });
    }

    const growdever = new Growdever(name, new Date(birth), cpf, skills);

    const repository = new GrowdeverRepository();

    await repository.createGrowdever(growdever);

    return response.json(growdever.toJson());
  }
}
