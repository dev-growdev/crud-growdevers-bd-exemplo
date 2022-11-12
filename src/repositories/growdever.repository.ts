import { Growdever } from "../models/growdever";
import { GrowdeverEntity } from "../database/entities/growdever.entity";

// Active Record
export class GrowdeverRepository {
  async getAllGrowdevers(): Promise<Growdever[]> {
    const growdeversEntities = await GrowdeverEntity.find();

    return growdeversEntities.map((growdeverEntity) =>
      Growdever.create(
        growdeverEntity.id,
        growdeverEntity.name,
        growdeverEntity.cpf,
        growdeverEntity.birth,
        growdeverEntity.status,
        growdeverEntity.skills ? growdeverEntity.skills.split(",") : []
      )
    );
  }

  async createGrowdever(growdever: Growdever): Promise<void> {
    const growdeverEntity = GrowdeverEntity.create({
      id: growdever.id,
      name: growdever.name,
      birth: growdever.birth,
      cpf: growdever.cpf,
      status: growdever.status,
      skills: growdever.skills.join(),
    });

    await growdeverEntity.save();
  }

  async getGrowdeverByUid(id: string): Promise<Growdever | undefined> {
    // const growdeverEntity = await GrowdeverEntity.findBy({ id });
    const growdeverEntity = await GrowdeverEntity.findOne({ where: { id } });

    if (!growdeverEntity) return undefined;

    return Growdever.create(
      growdeverEntity.id,
      growdeverEntity.name,
      growdeverEntity.cpf,
      growdeverEntity.birth,
      growdeverEntity.status,
      growdeverEntity.skills
        ? (growdeverEntity.skills as string).split(",")
        : []
    );
  }

  async existsGrowdeverByCpf(cpf: string): Promise<boolean> {
    const growdeverEntity = await GrowdeverEntity.findOneBy({ cpf });
    return !!growdeverEntity;
  }

  async updateGrowdever(growdever: Growdever): Promise<void> {
    const growdeveryEntity = await GrowdeverEntity.findOneBy({
      id: growdever.id,
    });

    if (!growdeveryEntity) throw new Error("Growdever não encontrado");

    growdeveryEntity.name = growdever.name;
    growdeveryEntity.birth = growdever.birth;
    growdeveryEntity.cpf = growdever.cpf;
    growdeveryEntity.status = growdever.status;
    growdeveryEntity.skills = growdever.skills.join();

    await growdeveryEntity.save();
  }

  async deleteGrowdever(id: string): Promise<boolean> {
    const growdeverEntity = await GrowdeverEntity.findOneBy({
      id,
    });

    if (!growdeverEntity) throw new Error("Growdever não existe");

    await growdeverEntity.remove();

    return true;
  }
}
