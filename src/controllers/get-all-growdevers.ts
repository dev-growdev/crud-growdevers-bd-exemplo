import { Request, Response } from "express";
import { getGrowdevers } from "../db/growdevers-pg";
import { GrowdeverRepository } from "../repositories/growdever";

export class GetAllGrowdeversController {
  // === SEM UTILIZAR O REPOSITORIO ===
  // async getAll(request: Request, response: Response) {
  //   const { name, status } = request.query;
  //   let growdevers = await getGrowdevers();
  //   if (name || status) {
  //     growdevers = growdevers.filter((growdever) => {
  //       let filterName = true;
  //       let filterStatus = true;
  //       if (name) {
  //         filterName = growdever.name
  //           .toLowerCase()
  //           .includes(name.toString().toLowerCase());
  //       }
  //       if (status) {
  //         filterStatus =
  //           growdever.status.toUpperCase() === status.toString().toUpperCase();
  //       }
  //       return filterName && filterStatus;
  //     });
  //   }
  //   return response.json(growdevers.map((g) => g.toJson()));
  // }

  // === UTILIZANDO O REPOSITORIO ===
  async getAll(request: Request, response: Response) {
    const { name, status } = request.query;
    const repository = new GrowdeverRepository();
    let growdevers = await repository.getAllGrowdevers();
    if (name || status) {
      growdevers = growdevers.filter((growdever) => {
        let filterName = true;
        let filterStatus = true;
        if (name) {
          filterName = growdever.name
            .toLowerCase()
            .includes(name.toString().toLowerCase());
        }
        if (status) {
          filterStatus =
            growdever.status.toUpperCase() === status.toString().toUpperCase();
        }
        return filterName && filterStatus;
      });
    }
    return response.json(growdevers.map((g) => g.toJson()));
  }
}
