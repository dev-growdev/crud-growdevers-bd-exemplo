import { NextFunction, Request, Response } from "express";
import { GrowdeverRepository } from "../repositories/growdever.repository";
import "../utils/extension-methods";

export class VerifyCpfExistsMiddleware {
  async verifyCpfExists(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { cpf } = request.body;

    const growdeverRepository = new GrowdeverRepository();

    const growdeverExists = await growdeverRepository.existsGrowdeverByCpf(cpf);

    if (growdeverExists) {
      return response.status(400).json({ error: "CPF já cadastrado" });
    }

    return next();
  }
}
