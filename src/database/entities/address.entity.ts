import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryColumn,
} from "typeorm";

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

  @Column({ name: "updated_at" })
  updatedAt!: Date;

  @Column({ name: "created_at" })
  createdAt!: Date;

  @BeforeInsert()
  beforeInsert() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.updatedAt = new Date();
  }
}
