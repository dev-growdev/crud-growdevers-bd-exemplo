import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "addresses" })
export class AddressEntity extends BaseEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  street!: string;

  @Column()
  city!: string;

  @Column()
  uf!: string;
}
