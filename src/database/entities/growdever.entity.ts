import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "growdevers" })
export class GrowdeverEntity extends BaseEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  birth!: Date;

  @Column()
  cpf!: string;

  @Column()
  status!: string;

  @Column()
  skills!: string;
}
