import { Growdever } from "../models/growdever";
import { GrowdeverEntity } from "../database/entities/growdever.entity";
import { Address } from "../models/address";
import { Assessment } from "../models/assessment";
import { AddressEntity } from "../database/entities/address.entity";
import { pgHelper } from "../database/pg-helper";
import { AssessmentEntity } from "../database/entities/assessment.entity";

// Active Record
// export class GrowdeverRepository {
//   async getAllGrowdevers(): Promise<Growdever[]> {
//     const growdeversEntities = await GrowdeverEntity.find();

//     return growdeversEntities.map((growdeverEntity) =>
//       Growdever.create(
//         growdeverEntity.id,
//         growdeverEntity.name,
//         growdeverEntity.cpf,
//         growdeverEntity.birth,
//         growdeverEntity.status,
//         growdeverEntity.skills ? growdeverEntity.skills.split(",") : []
//       )
//     );
//   }

//   async createGrowdever(growdever: Growdever): Promise<void> {
//     let addressEntity: AddressEntity | undefined;

//     if (growdever.address) {
//       addressEntity = AddressEntity.create({
//         id: growdever.address.id,
//         street: growdever.address.street,
//         city: growdever.address.city,
//         uf: growdever.address.uf,
//       });

//       await addressEntity.save();
//     }

//     const growdeverEntity = GrowdeverEntity.create({
//       id: growdever.id,
//       name: growdever.name,
//       birth: growdever.birth,
//       cpf: growdever.cpf,
//       status: growdever.status,
//       skills: growdever.skills.join(),
//       addressId: addressEntity?.id,
//     });

//     await growdeverEntity.save();
//   }

//   async getGrowdeverByUid(id: string): Promise<Growdever | undefined> {
//     // const growdeverEntity = await GrowdeverEntity.findBy({ id });
//     const growdeverEntity = await GrowdeverEntity.findOne({
//       where: { id },
//       relations: ["address", "assessments"],
//     });

//     if (!growdeverEntity) return undefined;

//     let address: Address | undefined;
//     let assessments: Assessment[] | undefined;

//     if (growdeverEntity.address) {
//       address = Address.create(
//         growdeverEntity.address.id,
//         growdeverEntity.address.street,
//         growdeverEntity.address.city,
//         growdeverEntity.address.uf
//       );
//     }

//     if (growdeverEntity.assessments) {
//       assessments = growdeverEntity.assessments.map((e) =>
//         Assessment.create(e.id, e.grade, e.subject)
//       );
//     }

//     const growdever = Growdever.create(
//       growdeverEntity.id,
//       growdeverEntity.name,
//       growdeverEntity.cpf,
//       growdeverEntity.birth,
//       growdeverEntity.status,
//       growdeverEntity.skills
//         ? (growdeverEntity.skills as string).split(",")
//         : [],
//       assessments,
//       address
//     );

//     return growdever;
//   }

//   async existsGrowdeverByCpf(cpf: string): Promise<boolean> {
//     const growdeverEntity = await GrowdeverEntity.findOneBy({ cpf });
//     return !!growdeverEntity;
//   }

//   async updateGrowdever(growdever: Growdever): Promise<void> {
//     const growdeverEntity = await GrowdeverEntity.findOne({
//       where: { id: growdever.id },
//       relations: ["address"],
//     });

//     if (!growdeverEntity) throw new Error("Growdever não encontrado");

//     growdeverEntity.name = growdever.name;
//     growdeverEntity.birth = growdever.birth;
//     growdeverEntity.cpf = growdever.cpf;
//     growdeverEntity.status = growdever.status;
//     growdeverEntity.skills = growdever.skills.join();

//     await growdeverEntity.save();

//     // atualiza endereco
//     if (growdeverEntity.address && growdever.address) {
//       growdeverEntity.address.street = growdever.address.street;
//       growdeverEntity.address.city = growdever.address.city;
//       growdeverEntity.address.uf = growdever.address.uf;
//       await growdeverEntity.address.save();
//     }

//     // cria novo endereco
//     if (!growdeverEntity.address && growdever.address) {
//       growdeverEntity.address = AddressEntity.create({
//         id: growdever.address.id,
//         street: growdever.address.street,
//         city: growdever.address.city,
//         uf: growdever.address.uf,
//       });
//       await growdeverEntity.address.save();
//       growdeverEntity.addressId = growdeverEntity.address.id;
//       await growdeverEntity.save();
//     }

//     // remove endereco
//     if (growdeverEntity.address && !growdever.address) {
//       // nao deu para fazer com: growdeverEntity.save()
//       await GrowdeverEntity.update(growdeverEntity.id, { addressId: null });
//       await growdeverEntity.address.remove();
//     }
//   }

//   async deleteGrowdever(id: string): Promise<boolean> {
//     const growdeverEntity = await GrowdeverEntity.findOne({
//       where: { id },
//       relations: ["address", "assessments"],
//     });

//     if (!growdeverEntity) throw new Error("Growdever não existe");

//     if (growdeverEntity.assessments) {
//       for await (const assessment of growdeverEntity.assessments) {
//         await assessment.remove();
//       }
//     }

//     await growdeverEntity.remove();

//     await growdeverEntity.address?.remove();

//     return true;
//   }
// }

// Data Mapper
export class GrowdeverRepository {
  async getAllGrowdevers(): Promise<Growdever[]> {
    const manager = pgHelper.client.manager;

    const growdeversEntities = await manager.find(GrowdeverEntity);

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
    const manager = pgHelper.client.manager;

    let addressEntity: AddressEntity | undefined;

    if (growdever.address) {
      addressEntity = manager.create(AddressEntity, {
        id: growdever.address.id,
        street: growdever.address.street,
        city: growdever.address.city,
        uf: growdever.address.uf,
      });

      await manager.save(addressEntity);
    }

    const growdeverEntity = manager.create(GrowdeverEntity, {
      id: growdever.id,
      name: growdever.name,
      birth: growdever.birth,
      cpf: growdever.cpf,
      status: growdever.status,
      skills: growdever.skills.join(),
      addressId: addressEntity?.id,
    });

    await manager.save(growdeverEntity);
  }

  async getGrowdeverByUid(id: string): Promise<Growdever | undefined> {
    const manager = pgHelper.client.manager;

    const growdeverEntity = await manager.findOne(GrowdeverEntity, {
      where: { id },
      relations: ["address", "assessments"],
    });

    if (!growdeverEntity) return undefined;

    let address: Address | undefined;
    let assessments: Assessment[] | undefined;

    if (growdeverEntity.address) {
      address = Address.create(
        growdeverEntity.address.id,
        growdeverEntity.address.street,
        growdeverEntity.address.city,
        growdeverEntity.address.uf
      );
    }

    if (growdeverEntity.assessments) {
      assessments = growdeverEntity.assessments.map((e) =>
        Assessment.create(e.id, e.grade, e.subject)
      );
    }

    const growdever = Growdever.create(
      growdeverEntity.id,
      growdeverEntity.name,
      growdeverEntity.cpf,
      growdeverEntity.birth,
      growdeverEntity.status,
      growdeverEntity.skills
        ? (growdeverEntity.skills as string).split(",")
        : [],
      assessments,
      address
    );

    return growdever;
  }

  async existsGrowdeverByCpf(cpf: string): Promise<boolean> {
    const growdeverEntity = await pgHelper.client.manager.findOneBy(
      GrowdeverEntity,
      { cpf }
    );
    return !!growdeverEntity;
  }

  async updateGrowdever(growdever: Growdever): Promise<void> {
    const manager = pgHelper.client.manager;

    const growdeverEntity = await manager.findOne(GrowdeverEntity, {
      where: { id: growdever.id },
      relations: ["address"],
    });

    if (!growdeverEntity) throw new Error("Growdever não encontrado");

    await manager.update(
      GrowdeverEntity,
      { id: growdeverEntity.id },
      {
        name: growdever.name,
        birth: growdever.birth,
        cpf: growdever.cpf,
        status: growdever.status,
        skills: growdever.skills.join(),
      }
    );

    // atualiza endereco
    if (growdeverEntity.address && growdever.address) {
      await manager.update(
        AddressEntity,
        { id: growdeverEntity.addressId },
        {
          street: growdever.address.street,
          city: growdever.address.city,
          uf: growdever.address.uf,
        }
      );
    }

    // cria novo endereco
    if (!growdeverEntity.address && growdever.address) {
      growdeverEntity.address = manager.create(AddressEntity, {
        id: growdever.address.id,
        street: growdever.address.street,
        city: growdever.address.city,
        uf: growdever.address.uf,
      });

      await manager.save(growdeverEntity.address);

      await manager.update(
        GrowdeverEntity,
        { id: growdeverEntity.id },
        { addressId: growdeverEntity.address.id }
      );
    }

    // remove endereco
    if (growdeverEntity.address && !growdever.address) {
      // nao deu para fazer com: growdeverEntity.save()
      await manager.update(
        GrowdeverEntity,
        { id: growdeverEntity.id },
        { addressId: null }
      );
      await manager.delete(AddressEntity, { id: growdeverEntity.addressId });
    }
  }

  async deleteGrowdever(id: string): Promise<boolean> {
    const manager = pgHelper.client.manager;

    const growdeverEntity = await manager.findOne(GrowdeverEntity, {
      where: { id },
      relations: ["address", "assessments"],
    });

    if (!growdeverEntity) throw new Error("Growdever não existe");

    if (growdeverEntity.assessments) {
      await manager.delete(AssessmentEntity, { growdeverId: id });
    }

    await manager.delete(GrowdeverEntity, { id: id });

    await manager.delete(AddressEntity, { id: growdeverEntity.addressId });

    return true;
  }
}
